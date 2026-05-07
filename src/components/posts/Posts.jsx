import styles from "./Posts.module.css";
import magnifyIconUrl from "../../assets/icons/magnify.svg";
import sortDescendingIconUrl from "../../assets/icons/sort-descending.svg";
import sortAscendingIconUrl from "../../assets/icons/sort-ascending.svg";
import loadingIconUrl from "../../assets/icons/loading.svg";
import errorIconUrl from "../../assets/icons/alert-rhombus.svg";
import usePosts from "../../hooks/usePosts";
import { format, parseISO } from "date-fns";
import DOMPurify from "dompurify";
import { Link } from "react-router";

const Posts = () => {
  const { posts, error, loading, query, setQuery } = usePosts();

  const updateQuery = (updates) =>
    setQuery((prev) => ({ ...prev, ...updates }));

  const changeSortOrder = () => {
    setQuery((prev) => {
      if (prev.sortOrder === "-") {
        return { ...prev, sortOrder: "+" };
      } else {
        return { ...prev, sortOrder: "-" };
      }
    });
  };

  return (
    <section className={styles.section}>
      <form className={styles.filters}>
        <div className={styles.searchBar}>
          <img src={magnifyIconUrl} alt="magnify-icon" />
          <input
            type="search"
            name="q"
            id="search"
            placeholder="Search for posts..."
            value={query.searchValue}
            onChange={(e) => updateQuery({ searchValue: e.target.value })}
          />
        </div>
        <div className={styles.sortBy}>
          <label htmlFor="sortBy">Sort By:</label>
          <select
            name="sort"
            id="sortBy"
            onChange={(e) => updateQuery({ sortBy: e.target.value })}
            value={query.sortBy === "createdAt" ? "createdAt" : "likes"}
          >
            <option value="createdAt">Publish Date</option>
            <option value="likes">Likes</option>
          </select>
        </div>
        <div className={styles.sortOrder}>
          <button onClick={changeSortOrder} type="button">
            {query.sortOrder === "-" ? (
              <img src={sortDescendingIconUrl} alt="Sort Descending" />
            ) : query.sortOrder === "+" ? (
              <img src={sortAscendingIconUrl} alt="Sort Ascending" />
            ) : (
              ""
            )}
          </button>
        </div>
      </form>

      {loading ? (
        <div className={styles.loading}>
          <img src={loadingIconUrl} alt="" />
        </div>
      ) : error ? (
        <div className={styles.networkError}>
          <img src={errorIconUrl} alt="" />
          <p>Network Error</p>
        </div>
      ) : posts.data.length > 0 ? (
        <>
          <div className={styles.posts}>
            {posts.data.map((post) => {
              const createdAtDate = parseISO(post.createdAt);
              return (
                <Link
                  to={`/posts/${post.id}`}
                  key={post.id}
                  className={styles.link}
                >
                  <div className={styles.post} key={post.id}>
                    <div className={styles.title}>
                      <p>{post.title}</p>
                      <p>
                        by{" "}
                        <span>
                          {post.author.firstName} {post.author.lastName}
                        </span>{" "}
                        at {format(createdAtDate, "MMM d, yyyy")}
                      </p>
                    </div>
                    <div className={styles.content}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(post.content),
                        }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className={styles.pagination}>
            <div className={styles.btns}>
              <div>
                {query.currentPage > 1 ? (
                  <button
                    className="previous"
                    onClick={() =>
                      setQuery((prev) => {
                        return { ...prev, currentPage: prev.currentPage - 1 };
                      })
                    }
                  >
                    {" "}
                    {"< Previous"}{" "}
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div>
                {query.currentPage !== posts.meta.totalPages ? (
                  <button
                    className="next"
                    onClick={() =>
                      setQuery((prev) => {
                        return { ...prev, currentPage: prev.currentPage + 1 };
                      })
                    }
                  >
                    {"Next >"}
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <p>
              Showing from{" "}
              {(query.currentPage - 1) * posts.meta.itemsPerPage + 1} to{" "}
              {Math.min(
                query.currentPage * posts.meta.itemsPerPage,
                posts.meta.totalItems,
              )}{" "}
              out of {posts.meta.totalItems}
            </p>
          </div>
        </>
      ) : (
        <div className={styles.notFound}>
          <p>No Posts Found !</p>
        </div>
      )}
    </section>
  );
};

export default Posts;
