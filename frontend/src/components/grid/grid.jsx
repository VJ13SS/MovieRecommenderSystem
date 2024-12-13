import './grid.css'

export default function Grid() {
  return (
    <div className="grid">
      <div className="content">
        <h1>
          Unlimited <span>Movies</span> Unlimited <span>Fun</span>
        </h1>
        <p>
          Ready to enter into the diverse world of movies..?Engage your selves
          into the dynamic movie exprience
        </p>
      </div>
      <div className="input">
        <input type='text' placeholder='Search for a movie...' />
        <button>Search</button>
      </div>
      
    </div>
  );
}
