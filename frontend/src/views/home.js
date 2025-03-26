import React, { Fragment } from 'react'

import { Helmet } from 'react-helmet'

import Navbar8 from '../components/navbar8'
import Hero17 from '../components/hero17'
import Features24 from '../components/features24'
import CTA26 from '../components/cta26'
import Features25 from '../components/features25'
import Steps2 from '../components/steps2'
import Testimonial17 from '../components/testimonial17'
import Contact10 from '../components/contact10'
import Footer4 from '../components/footer4'
import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Spectacular Well To Do Dove</title>
        <meta property="og:title" content="Spectacular Well To Do Dove" />
      </Helmet>
      <Navbar8
        page4Description={
          <Fragment>
            <span className="home-text10">
              View your travel itinerary and saved trips
            </span>
          </Fragment>
        }
        action1={
          <Fragment>
            <span className="home-text11">Search Flights</span>
          </Fragment>
        }
        link2={
          <Fragment>
            <span className="home-text12">Login</span>
          </Fragment>
        }
        page1={
          <Fragment>
            <span className="home-text13">Sign In</span>
          </Fragment>
        }
        link1={
          <Fragment>
            <span className="home-text14">Sign In</span>
          </Fragment>
        }
        page4={
          <Fragment>
            <span className="home-text15">Dashboard</span>
          </Fragment>
        }
        page2={
          <Fragment>
            <span className="home-text16">Login</span>
          </Fragment>
        }
        link4={
          <Fragment>
            <span className="home-text17">Dashboard</span>
          </Fragment>
        }
        page1Description={
          <Fragment>
            <span className="home-text18">Sign in to access your account</span>
          </Fragment>
        }
        page2Description={
          <Fragment>
            <span className="home-text19">Login to your account</span>
          </Fragment>
        }
        link3={
          <Fragment>
            <span className="home-text20">Home</span>
          </Fragment>
        }
        page3={
          <Fragment>
            <span className="home-text21">Home</span>
          </Fragment>
        }
        page3Description={
          <Fragment>
            <span className="home-text22">
              Explore destinations and plan your trips
            </span>
          </Fragment>
        }
        action2={
          <Fragment>
            <span className="home-text23">Book Accommodation</span>
          </Fragment>
        }
      ></Navbar8>
      <Hero17
        action2={
          <Fragment>
            <span className="home-text24">Learn More</span>
          </Fragment>
        }
        action1={
          <Fragment>
            <span className="home-text25">Sign Up Now</span>
          </Fragment>
        }
        heading1={
          <Fragment>
            <span className="home-text26">Explore the World with Ease</span>
          </Fragment>
        }
        content1={
          <Fragment>
            <span className="home-text27">
              Plan your next adventure with our user-friendly travel web
              application. Discover new destinations, create itineraries, and
              make memories that last a lifetime.
            </span>
          </Fragment>
        }
      ></Hero17>
      <Features24
        feature3Description={
          <Fragment>
            <span className="home-text28">Plan Your Itinerary</span>
          </Fragment>
        }
        feature3Title={
          <Fragment>
            <span className="home-text29">Itinerary Planning</span>
          </Fragment>
        }
        feature2Description={
          <Fragment>
            <span className="home-text30">Discover Local Cuisine</span>
          </Fragment>
        }
        feature1Title={
          <Fragment>
            <span className="home-text31">Discover New Places</span>
          </Fragment>
        }
        feature1Description={
          <Fragment>
            <span className="home-text32">Find Hidden Gems</span>
          </Fragment>
        }
        feature2Title={
          <Fragment>
            <span className="home-text33">Local Culinary Delights</span>
          </Fragment>
        }
      ></Features24>
      <CTA26
        heading1={
          <Fragment>
            <span className="home-text34">Start Your Adventure Today</span>
          </Fragment>
        }
        content1={
          <Fragment>
            <span className="home-text35">
              Sign up now to access exclusive travel deals and plan your next
              trip with ease.
            </span>
          </Fragment>
        }
        action1={
          <Fragment>
            <span className="home-text36">Sign Up</span>
          </Fragment>
        }
      ></CTA26>
      <Features25
        feature3Description={
          <Fragment>
            <span className="home-text37">
              Stay informed with real-time updates on flight statuses, weather
              conditions, and more.
            </span>
          </Fragment>
        }
        feature1Description={
          <Fragment>
            <span className="home-text38">
              Easily navigate through the application with our intuitive user
              interface.
            </span>
          </Fragment>
        }
        feature2Title={
          <Fragment>
            <span className="home-text39">Personalized Recommendations</span>
          </Fragment>
        }
        feature1Title={
          <Fragment>
            <span className="home-text40">User-Friendly Interface</span>
          </Fragment>
        }
        feature2Description={
          <Fragment>
            <span className="home-text41">
              Receive tailored travel recommendations based on your preferences
              and past trips.
            </span>
          </Fragment>
        }
        feature3Title={
          <Fragment>
            <span className="home-text42">Real-Time Updates</span>
          </Fragment>
        }
      ></Features25>
      <Steps2
        step1Description={
          <Fragment>
            <span className="home-text43">
              Create an account to start using our travel web application.
            </span>
          </Fragment>
        }
        step3Description={
          <Fragment>
            <span className="home-text44">
              Discover new destinations, plan your trips, and save your favorite
              spots.
            </span>
          </Fragment>
        }
        step2Title={
          <Fragment>
            <span className="home-text45">Log In</span>
          </Fragment>
        }
        step2Description={
          <Fragment>
            <span className="home-text46">
              Already have an account? Simply log in to access your dashboard.
            </span>
          </Fragment>
        }
        step1Title={
          <Fragment>
            <span className="home-text47">Sign Up</span>
          </Fragment>
        }
        step3Title={
          <Fragment>
            <span className="home-text48">Explore</span>
          </Fragment>
        }
        step4Description={
          <Fragment>
            <span className="home-text49">
              Make the most of your adventures with our travel web application.
            </span>
          </Fragment>
        }
        step4Title={
          <Fragment>
            <span className="home-text50">Enjoy Your Travels</span>
          </Fragment>
        }
      ></Steps2>
      <Testimonial17
        author2Position={
          <Fragment>
            <span className="home-text51">Frequent Traveler</span>
          </Fragment>
        }
        author1Position={
          <Fragment>
            <span className="home-text52">Travel Enthusiast</span>
          </Fragment>
        }
        author1Name={
          <Fragment>
            <span className="home-text53">John Doe</span>
          </Fragment>
        }
        author3Name={
          <Fragment>
            <span className="home-text54">David Johnson</span>
          </Fragment>
        }
        review2={
          <Fragment>
            <span className="home-text55">
              The user interface is intuitive, and I love how I can save my
              favorite destinations for future trips. Great app!
            </span>
          </Fragment>
        }
        author2Name={
          <Fragment>
            <span className="home-text56">Jane Smith</span>
          </Fragment>
        }
        author4Position={
          <Fragment>
            <span className="home-text57">Solo Traveler</span>
          </Fragment>
        }
        author4Name={
          <Fragment>
            <span className="home-text58">Emily Brown</span>
          </Fragment>
        }
        content1={
          <Fragment>
            <span className="home-text59">
              Read what our users have to say about their travel experiences
              with our app.
            </span>
          </Fragment>
        }
        author3Position={
          <Fragment>
            <span className="home-text60">Adventure Seeker</span>
          </Fragment>
        }
        review1={
          <Fragment>
            <span className="home-text61">
              I have been using this travel app for a while now, and it has made
              planning my trips so much easier. Highly recommended!
            </span>
          </Fragment>
        }
        heading1={
          <Fragment>
            <span className="home-text62">Testimonials</span>
          </Fragment>
        }
        review3={
          <Fragment>
            <span className="home-text63">
              I have discovered hidden gems thanks to this app&apos;s
              recommendations. It has truly enhanced my travel experiences.
            </span>
          </Fragment>
        }
        review4={
          <Fragment>
            <span className="home-text64">
              As a solo traveler, safety is my top priority. This app provides
              me with essential information to ensure a smooth journey.
            </span>
          </Fragment>
        }
      ></Testimonial17>
      <Contact10
        content1={
          <Fragment>
            <span className="home-text65">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in ero.
            </span>
          </Fragment>
        }
        location1Description={
          <Fragment>
            <span className="home-text66">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in ero.
            </span>
          </Fragment>
        }
        heading1={
          <Fragment>
            <span className="home-text67">Locations</span>
          </Fragment>
        }
        location2Description={
          <Fragment>
            <span className="home-text68">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in ero.
            </span>
          </Fragment>
        }
        location1={
          <Fragment>
            <span className="home-text69">Bucharest</span>
          </Fragment>
        }
        location2={
          <Fragment>
            <span className="home-text70">Cluj - Napoca</span>
          </Fragment>
        }
      ></Contact10>
      <Footer4
        link5={
          <Fragment>
            <span className="home-text71">Privacy Policy</span>
          </Fragment>
        }
        link3={
          <Fragment>
            <span className="home-text72">FAQs</span>
          </Fragment>
        }
        link1={
          <Fragment>
            <span className="home-text73">About Us</span>
          </Fragment>
        }
        termsLink={
          <Fragment>
            <span className="home-text74">Terms and Conditions</span>
          </Fragment>
        }
        link2={
          <Fragment>
            <span className="home-text75">Contact Us</span>
          </Fragment>
        }
        link4={
          <Fragment>
            <span className="home-text76">Terms and Conditions</span>
          </Fragment>
        }
        cookiesLink={
          <Fragment>
            <span className="home-text77">Cookies Policy</span>
          </Fragment>
        }
        privacyLink={
          <Fragment>
            <span className="home-text78">Privacy Policy</span>
          </Fragment>
        }
      ></Footer4>
    </div>
  )
}

export default Home
