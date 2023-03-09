import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header>Header</header>
      <div id = "content">
        {/* child components get injected here and replace <Outlet /> */}
        <Outlet />
      </div>
      <footer>Footer</footer>
    </>
  )
}

export default Layout;