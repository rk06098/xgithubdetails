import { useState } from "react";
import "./styles.css";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!username.trim()) {
      setError("Please enter a GitHub username.");
      setUser(null);
      return;
    }

    setError("");

    try {
      const res = await fetch(
        `https://api.github.com/users/${username}`
      );
      const data = await res.json();

      if (data.message === "Not Found") {
        setUser(null);
        return;
      }

      setUser(data);
    } catch (err) {
      setUser(null);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1>GitHub User Finder</h1>
        <p className="subtitle">
          Search a GitHub username to see profile details.
        </p>

        <div className="search-row">
          <input
            type="text"
            name="username"  
            placeholder="e.g. torvalds, gaearon, octocat"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {error && <div className="error">{error}</div>}

        {!user && !error && (
          <p className="empty">
            No user yet. Try searching for "octocat".
          </p>
        )}

        {user && (
          <div className="profile">
            <img src={user.avatar_url} alt={user.login} />

            <div className="info">
              <h2>
                {user.name} <span>@{user.login}</span>
              </h2>

              <div className="stats">
                <span>{user.public_repos} Repos</span>
                <span>{user.followers} Followers</span>
                <span>{user.following} Following</span>
              </div>

              <div className="links">
                {user.location && <p>📍 {user.location}</p>}
                {user.company && <p>🏢 {user.company}</p>}
                {user.blog && (
                  <a href={user.blog} target="_blank" rel="noreferrer">
                    {user.blog}
                  </a>
                )}
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;