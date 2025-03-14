import React, { useState } from "react";
import Papa from "papaparse";

const BASE_URL =
  "https://www.cpprhtn.com/form/forms/{FORM_ID}/answers/export-to-csv";

const Admin = () => {
  const [formId, setFormId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    if (!formId || !apiKey) {
      alert("Form ID와 API Key를 입력해주세요.");
      return;
    }

    const apiUrl = BASE_URL.replace("{FORM_ID}", formId);

    setLoading(true);
    fetch(apiUrl, {
      method: "POST",
      headers: { "x-api-key": apiKey },
    })
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: false,
          complete: (result) => {
            const formattedData = result.data.map((row) => {
              const [id, email, jsonStr, timestamp] = row;
              let parsedJson = {};
              try {
                parsedJson = JSON.parse(jsonStr);
              } catch (e) {
                console.error("JSON 파싱 오류:", e);
              }
              return { id, email, ...parsedJson, timestamp };
            });

            setData(formattedData);

            if (formattedData.length > 0) {
              setHeaders(Object.keys(formattedData[0]));
            }
          },
        });
      })
      .catch((error) => console.error("데이터 가져오기 실패:", error))
      .finally(() => setLoading(false));
  };

  const downloadCSV = () => {
    if (data.length === 0) {
      alert("다운로드할 데이터가 없습니다.");
      return;
    }

    const csvString = Papa.unparse(data, { delimiter: "," });

    // UTF-8
    const bom = "\uFEFF";
    const blob = new Blob([bom + csvString], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `form_data_${formId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2>CSV 데이터 불러오기</h2>
      <div>
        <input
          type="text"
          placeholder="예: DemandSurvey2025s"
          value={formId}
          onChange={(e) => setFormId(e.target.value)}
        />
        <input
          type="text"
          placeholder="x-api-key 입력"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <button onClick={fetchData} disabled={loading}>
          {loading ? "불러오는 중..." : "데이터 가져오기"}
        </button>

        <button onClick={downloadCSV} style={{ margin: "10px 0" }}>
          CSV 다운로드
        </button>
      </div>

      {data.length > 0 ? (
        <>
          <table border="1">
            <thead>
              <tr>
                {headers
                  .filter((key) => !["id", "email", "timestamp"].includes(key))
                  .map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  {headers
                    .filter(
                      (key) => !["id", "email", "timestamp"].includes(key)
                    )
                    .map((key, i) => (
                      <td key={i}>
                        {Array.isArray(row[key])
                          ? row[key].join(", ")
                          : row[key] || "없음"}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>데이터 없음</p>
      )}
    </div>
  );
};

export default Admin;
