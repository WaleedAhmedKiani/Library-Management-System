import { BookofTheWeek, Contact, LibraryCard, LibraryHours, Upcomming } from "../../landing"
import "./Home.css"





const Home = () => {
  return (
    <div className="page" >
      <div className="home-page-container">
        <div className="home-page-left">
          <BookofTheWeek />
          <Upcomming />
          <LibraryCard />
        </div>
        <div className="home-page-right">
          <LibraryHours />
          <Contact />
        </div>
      </div>
    </div>
  )
}

export default Home