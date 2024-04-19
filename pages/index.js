import ClassLink from "../components/ClassLink";

export default function Home() {
  return (
    <div>
      <main>
        <section className="hero is-medium is-link">
          <div className="hero-body columns is-vcentered">
            <div className="column">
              <p className="title">Ask and share questions during class</p>
              <p className="subtitle">
                Quickly a URL where you can post questions during class and see
                what other users are saying
              </p>
              <ClassLink />
            </div>
            <div className="column">
              <figure>
                <img src="https://dummyimage.com/640x360/fff/aaa" />
              </figure>
            </div>
          </div>
        </section>

        <section className="hero is-medium">
          <div className="hero-body columns is-vcentered">
            <div className="column">
              <figure>
                <img src="https://dummyimage.com/640x360/fff/aaa" />
              </figure>
            </div>
            <div className="column">
              <p className="title">
                Share questions with the class using a custom URL
              </p>
              <p className="subtitle">
                Create your own temporary URL where you can save questions and
                view them in real time.
              </p>
            </div>
          </div>
        </section>

        <section className="hero is-medium has-background-white-ter	">
          <div className="hero-body columns is-vcentered">
            <div className="column">
              <p className="title">Ask a question</p>
              <p className="subtitle">
                Write a new questions to share with the class. Delete it if you
                made a mistake.
              </p>
            </div>
            <div className="column">
              <figure>
                <img src="https://dummyimage.com/640x360/fff/aaa" />
              </figure>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
