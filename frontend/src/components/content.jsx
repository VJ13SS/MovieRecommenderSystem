import './content.css'
import Grid from './grid/grid'
import Movies from './movies/movies'
import Nav from './nav/nav'

export default function Content({displaySpinner}){
    return(
        <div className="app-content" style={{ display: displaySpinner ? "none" : "flex" }}>
        <Nav />
        <Grid />
        <Movies />
    </div>
    )
    
}