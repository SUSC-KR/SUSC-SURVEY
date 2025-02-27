import { Outlet } from "react-router-dom";

const Header : React.FC = () => {
  return (
    <>
    <header>
      <div>
        <a href="https://susc.kr" target="_blank" className="logo">
          <img src="/susc.svg" className="graphicIcon" />
          <img src="/logo.png" alt="SUSC" className="typoIcon"  />
        </a>
        <span>설문조사</span>
      </div>
      <a href="https://discord.gg/98UmVfkm73" target="_blank">Discord</a>
    </header>
    <main>
      <Outlet />
    </main>
    </>
  )
}

export default Header;