import React from "react";
import Header from "../../Components/Header";

function About(props) {
  const scrollToMore = () => {
    document.querySelector("#more").scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-row content-center align-center justify-center bg-gradient-to-b from-indigo-400 w-full to-indigo-700 pt-20">
        <div className="container shadow-5xl m-auto bg-indigo-50 grid grid-cols-1 md:grid-cols-2 mb-16">
          <div
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1618999114008-fbf937170cdb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGFmcmljYW4lMjBjb3VwbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80)`,
              backgroundPosition: "top",
              backgroundSize: "cover",
            }}
            className="h-72 md:h-full"
          >
            <div className="bg-black bg-opacity-50 h-full w-full"></div>
          </div>
          <div className="px-8 py-20">
            <h3 className="text-xl mb-2 tracking-widest uppercase font-semibold text-indigo-500">
              Best Match Makers in Africa
            </h3>
            <h1 className="text-5xl md:text-8xl font-extrabold text-indigo-600 mb-4">
              About Us
            </h1>
            <p className="tracking-wide my-6 md:my-12 text-gray-800 text-md md:text-xl">
              The world is changing everyday. Life is moving at a faster pace,
              and coupled with work and other daily responsibilities, it is
              little surprise that we have hardly any time for the things that
              truly matter. Faith, family and most importantly, love. <br />
              <br />
              This is where we come in; We are SIMETI MATCHES, your best bet to
              finding that perfect match for you! We take ‘chance’ out of the
              equation when it comes to finding your Mr or Mrs Right. We do this
              through a carefully curated process that employs statistical and
              psychological markers to find your match. In layman’s terms we are
              here to find you your harmattan pawpaw, the Yin to your Yang, the
              Romeo to your Juliet and the Cleopatra to your Caesar.
            </p>
            <button
              onClick={scrollToMore}
              className="mt-4 px-8 py-4 uppercase tracking-widest text-indigo-50 bg-indigo-500 text-xl font-semi bold"
            >
              <span className="animate-bounce fa fa-arrow-down"></span> &nbsp;
              Know more
            </button>
          </div>
        </div>
      </div>
      <div id="more" className="text-center p-4 md:p-12 m-auto container">
        <div className="h-6 md:h-12"></div>
        <h1 className="font-extrabold md:tracking-wider text-3xl md;text-4xl my-6 text-gray-800">
          We house 500+ potential suitors just for you.
        </h1>
        <p className="my-3 text-lg md:text-2xl font-semibold">
          Individuals looking for life partners have never had it easier
        </p>

        <div className="h-6"></div>
        <button className="mt-4 px-4 md:px-8 py-4 uppercase md:tracking-widest text-indigo-50 bg-indigo-500 text-lg md:text-xl font-semi bold">
          <span className="animate-bounce fa fa-arrow-down"></span> &nbsp; Our
          Process is simple
        </button>
        <div className="h-12"></div>
      </div>
      <div className="bg-gray-700 py-12">
        <div className="h-0 md:h-16"></div>
        <div className="pb-6 p-3 container m-auto">
          <h2 className="mb-4 text-2xl md:text-3xl md:text-5xl font-extrabold tracking-wider text-white">
            Finding a partner has never been simpler...
          </h2>
        </div>
        <div className="container p-3 m-auto grid grid-cols-1 md:grid-cols-4">
          <div className="text-white p-3 md:p-6 bg-indigo-700 flex flex-col">
            <h3 className="font-extrabold text-3xl md:text-4xl my-4">01</h3>
            <p className="text-md md:text-xl flex-grow my-auto">
              You answer all relevant questions about yourself, your preferences
              as well as your dealbreakers in a partner
            </p>
            <p className="h-12 w-12 bg-white mt-4 rounded-full flex flex-col align-center justify-center">
              <span className="fa text-2xl fa-chevron-right text-black m-auto"></span>
            </p>
          </div>

          <div className="text-indigo-500 p-3 md:p-6 bg-white flex flex-col">
            <h3 className="font-extrabold text-3xl md:4xl my-4">02</h3>
            <p className="text-md md:text-xl flex-grow my-auto">
              You make a payment of a GHS 1000.00 (a small token for a
              highly-probable happily ever after) and then your details are
              submitted.
            </p>
            <p className="h-12 w-12 bg-indigo-700 mt-4 rounded-full flex flex-col align-center justify-center">
              <span className="fa text-2xl fa-chevron-right text-white m-auto"></span>
            </p>
          </div>

          <div className="text-white p-3 md:p-6 bg-gray-700 flex flex-col">
            <h3 className="font-extrabold text-3xl md:text-4xl my-4">03</h3>
            <p className="text-md md:text-xl flex-grow my-auto">
              Our Algorithm works its magic to churn out the best possible
              partner for you
            </p>
            <p className="h-12 w-12 bg-white mt-4 rounded-full flex flex-col align-center justify-center">
              <span className="fa text-2xl fa-chevron-right text-black m-auto"></span>
            </p>
          </div>

          <div className="text-white p-3 md:p-6 bg-gray-900 flex flex-col">
            <h3 className="font-extrabold text-3xl md:text-4xl my-4">04</h3>
            <p className="text-md md:text-xl flex-grow my-auto">
              The details of our potential suitor as well as our codes of
              conduct are sent to you via mail
            </p>
            <p className="h-12 w-12 bg-white mt-4 rounded-full flex flex-col align-center justify-center">
              <span className="fa text-2xl fa-chevron-right text-black m-auto"></span>
            </p>
          </div>
        </div>
        <div className="h-20"></div>
      </div>
      <div className="text-left p-4 md:p-12 m-auto container">
        <div className="h-6 md:h-12"></div>
        <h1 className="font-extrabold md:tracking-wide text-3xl md:text-4xl my-6 text-gray-800">
          Simeti Matches is your best bet
        </h1>
        <p className="text-lg text-gray-600">
          As far as finding a life partner is concerned. Perhaps all you ever do
          is work and you rarely go out to socialize so your chances of meeting
          anyone are rather low. Or maybe you’re a social butterfly and you meet
          many people but somehow you never meet the right person for you. Maybe
          you even tried online dating and haven’t had the best luck there, or
          friends have introduced you to people who were just not right for you
          and things just fizzled out before they even took off.
          <br /> <br />
          Enter the corona virus and the face mask and now meeting people is
          even more difficult than it was before.
        </p>
        <div className="h-12"></div>
        <h1 className="font-extrabold md:tracking-wide text-3xl md:text-4xl my-6 text-gray-800">
          Here’s where we come in
        </h1>
        <p className="text-lg text-gray-600">
          ‘Simeti’ an Amarhic word which means ‘emotion’ is at the very heart of
          what we do. And what do we do? At Simēti Matches, we do for you what
          your friends, family and social events have been unable to…we match
          you to the right person for you!
          <br /> <br />
          All you have to do is sign up and let us at Simeti do all the hard
          work and voilà!
        </p>
        <div className="h-12"></div>
        <h1 className="font-extrabold md:tracking-wide text-3xl md:text-4xl my-6 text-gray-800">
          We have perfected the beautiful art and wonderful science of
          matchmaking
        </h1>
        <p className="text-lg text-gray-600">
          based on a carefully curated process which uses your personality, love
          language etc etc… you get the picture, right? We’ve got you! Simply
          put, we are your love plug, your ultimate matchmakers!
          <br /> <br /> There’s always someone out there for everyone! So...get
          ready to step out of your comfort zone and prepare to meet the yin to
          your yang! There’s no harm in trying, is there? Just believe in the
          process and allow us to work our magic on you!
          <br /> <br /> The information given herein is deemed privileged and
          will not be shared with any third party.
          <br /> <br /> Kindly note that the more accurate your personal
          information is, the better your matching experience will be.
        </p>
        <div className="h-12"></div>
      </div>
    </div>
  );
}

export default About;
