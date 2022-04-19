import Navbar from "../../components/navbar/Navbar"
import Featured from "../../components/featured/Featured"
import "./home.scss"
import List from "../../components/list/List"
import { useEffect, useState } from "react";
import MovieService from '../../services/movie_service'


const categoriesFeatured = ['adventure', 'horror', 'comedy'];

const Home = (props) => {  
  const [adventureMovies, setAdventureMovies] = useState();
  const [horrorMovies, setHorrorMovies] = useState();
  const [comedyMovies, setComedyMovies] = useState();

  const moviesCategories = [adventureMovies, horrorMovies, comedyMovies];
  useEffect(() => {
    categoriesFeatured.forEach(category => {
      MovieService.getMoviesByGenre(category).then((res) => {
        category == "adventure" ? setAdventureMovies(res) : category == "horror" ? setHorrorMovies(res) : setComedyMovies(res);
      })
    })

  }, []);
  return (
    <div className="home">
      <Navbar props={props.props} />
      <Featured type="movie" />
      {moviesCategories.map((category, index) => {
        return (category && <List props={category} key={index} />)
      })}
    </div>
  );
};

export default Home;

