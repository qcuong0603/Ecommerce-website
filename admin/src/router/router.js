import AdminLayout from "../pages/AdminLayout"
import DashboardView from "../pages/DashboardView"
import ProductAdmin from "../pages/Products/ProductAdmin"
import ColorAdmin from "../pages/ColorAdmin"
export const routers = [
   {
      path: "/",
      page: AdminLayout,
      children: [
        { path: "", page: DashboardView  }, 
        {path:"product",page:ProductAdmin},
        {path:"color",page:ColorAdmin}
      ],
    },]