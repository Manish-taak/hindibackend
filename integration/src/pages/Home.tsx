import Banner from "../components/home/Banner"
import Register from "../components/home/Register"
import UpdatePassword from "../components/home/UpdatePassword"
import Users from "../components/home/Users"

const Home = () => {
  return (
    <>
      <div className="max-w-[1440px] px-5 mx-auto">
        <Register />
        <Banner />
        <UpdatePassword />
        <Users/>
      </div>
    </>
  )
}

export default Home
