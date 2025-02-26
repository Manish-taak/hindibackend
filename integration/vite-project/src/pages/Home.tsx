import Banner from "../components/home/Banner"
import Register from "../components/home/Register"
import UpdatePassword from "../components/home/updatePassword"

const Home = () => {
  return (
    <>
      <div className="max-w-[1440px] px-5 mx-auto">
        <Register />
        <Banner />
        <UpdatePassword />
      </div>
    </>
  )
}

export default Home
