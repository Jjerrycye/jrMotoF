import Center from "@/views/center/Center"
import Home from "@/views/home/Home"
import UserAdd from "@/views/user-manger/UserAdd"
import UserList from "@/views/user-manger/UserList"
import NewsAdd from "@/views/news-manger/NewsAdd"
import NewsList from "@/views/news-manger/NewsList"
import EditorNews from "@/views/news-manger/EditorNews"
import ProductAdd from "@/views/product-manger/ProductAdd"
import ProductList from "@/views/product-manger/ProductList"
import EditProduct from "@/views/product-manger/EditProduct"
import NotFound from "@/views/notFound/NotFound"

//通过动态方法在index.js中添加子路由
const routes = [
    {
        path: '/center',
        component: Center
    },
    {
        path: '/index',
        component: Home
    },
    {
        path: '/user-manger/userAdd',
        component: UserAdd,
        requireAdmin: true//一 为要做路由权限控制的路由加上requireAdmin字段
    },
    {
        path: '/user-manger/userList',
        component: UserList,
        requireAdmin: true
    },
    {
        path: '/news-manger/newsAdd',
        component: NewsAdd
    },
    {
        path: '/news-manger/newsList',
        component: NewsList
    },
    {
        path: '/news-manger/editornews:id',
        component: EditorNews
    },
    {
        path: '/product-manger/productAdd',
        component: ProductAdd
    },
    {
        path: '/product-manger/productList',
        component: ProductList
    },
    {
        path: '/product-manger/editproduct:id',
        component: EditProduct
    },
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: "/:pathMatch(.*)*",//输入/aaa/bbb等路由时 匹配404页面
        name: "Notfount",
        component: NotFound
    }
]

export default routes