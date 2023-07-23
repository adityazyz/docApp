import React from "react";
import Head from "next/head";

function HomePage() {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>

      <div>
        {/* { { /* <!-- Main Wrapper --> */}
        <div className="main-wrapper">

          {/* <!-- Home Banner --> */}
          <section className="section section-search">
            <div className="container-fluid">
              <div className="banner-wrapper">
                <div className="banner-header text-center">
                  <h1>Search Doctor, Make an Appointment</h1>
                  <p>
                    Discover the best doctors, clinic & hospital the city
                    nearest to you.
                  </p>
                </div>

                {/* <!-- Search --> */}
                <div className="search-box">
                  <form action="https://dreamguys.co.in/demo/doccure/template/search.html">
                    <div className="form-group search-location">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Location"
                      />
                      <span className="form-text">Based on your Location</span>
                    </div>
                    <div className="form-group search-info">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Doctors, Clinics, Hospitals, Diseases Etc"
                      />
                      <span className="form-text">
                        Ex : Dental or Sugar Check up etc
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary search-btn"
                    >
                      <i className="fas fa-search"></i> <span>Search</span>
                    </button>
                  </form>
                </div>
                {/* <!-- /Search --> */}
              </div>
            </div>
          </section>
          {/* <!-- /Home Banner --> */}

          {/* <!-- Clinic and Specialities --> */}
          <section className="section section-specialities">
            <div className="container-fluid">
              <div className="section-header text-center">
                <h2>Clinic and Specialities</h2>
                <p className="sub-title">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-9">
                  {/* <!-- Slider --> */}
                  <div className="specialities-slider slider">
                    {/* <!-- Slider Item --> */}
                    <div className="speicality-item text-center">
                      <div className="speicality-img">
                        <img
                          src="/assets/img/specialities/specialities-01.png"
                          className="img-fluid"
                          alt="Speciality"
                        />
                        <span>
                          <i className="fa fa-circle" aria-hidden="true"></i>
                        </span>
                      </div>
                      <p>Urology</p>
                    </div>
                    {/* <!-- /Slider Item --> */}

                    {/* <!-- Slider Item --> */}
                    <div className="speicality-item text-center">
                      <div className="speicality-img">
                        <img
                          src="/assets/img/specialities/specialities-02.png"
                          className="img-fluid"
                          alt="Speciality"
                        />
                        <span>
                          <i className="fa fa-circle" aria-hidden="true"></i>
                        </span>
                      </div>
                      <p>Neurology</p>
                    </div>
                    {/* <!-- /Slider Item --> */}

                    {/* <!-- Slider Item --> */}
                    <div className="speicality-item text-center">
                      <div className="speicality-img">
                        <img
                          src="/assets/img/specialities/specialities-03.png"
                          className="img-fluid"
                          alt="Speciality"
                        />
                        <span>
                          <i className="fa fa-circle" aria-hidden="true"></i>
                        </span>
                      </div>
                      <p>Orthopedic</p>
                    </div>
                    {/* <!-- /Slider Item --> */}

                    {/* <!-- Slider Item --> */}
                    <div className="speicality-item text-center">
                      <div className="speicality-img">
                        <img
                          src="/assets/img/specialities/specialities-04.png"
                          className="img-fluid"
                          alt="Speciality"
                        />
                        <span>
                          <i className="fa fa-circle" aria-hidden="true"></i>
                        </span>
                      </div>
                      <p>Cardiologist</p>
                    </div>
                    {/* <!-- /Slider Item --> */}

                    {/* <!-- Slider Item --> */}
                    <div className="speicality-item text-center">
                      <div className="speicality-img">
                        <img
                          src="/assets/img/specialities/specialities-05.png"
                          className="img-fluid"
                          alt="Speciality"
                        />
                        <span>
                          <i className="fa fa-circle" aria-hidden="true"></i>
                        </span>
                      </div>
                      <p>Dentist</p>
                    </div>
                    {/* <!-- /Slider Item --> */}
                  </div>
                  {/* <!-- /Slider --> */}
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Clinic and Specialities --> */}

          {/* <!-- Popular Section --> */}
          <section className="section section-doctor">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-4">
                  <div className="section-header ">
                    <h2>Book Our Doctor</h2>
                    <p>Lorem Ipsum is simply dummy text </p>
                  </div>
                  <div className="about-content">
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum.
                    </p>
                    <p>
                      web page editors now use Lorem Ipsum as their default
                      model text, and a search for 'lorem ipsum' will uncover
                      many web sites still in their infancy. Various versions
                      have evolved over the years, sometimes
                    </p>
                    <a href='/'>Read More..</a>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="doctor-slider slider">
                    {/* <!-- Doctor Widget --> */}
                    <div className="profile-widget">
                      <div className="doc-img">
                        <a href="doctor-profile.html">
                          <img
                            className="img-fluid"
                            alt="User Image"
                            src="/assets/img/doctors/doctor-01.jpg"
                          />
                        </a>
                        <a href="/" className="fav-btn">
                          <i className="far fa-bookmark"></i>
                        </a>
                      </div>
                      <div className="pro-content">
                        <h3 className="title">
                          <a href="doctor-profile.html">Ruby Perrin</a>
                          <i className="fas fa-check-circle verified"></i>
                        </h3>
                        <p className="speciality">
                          MDS - Periodontology and Oral Implantology, BDS
                        </p>
                        <div className="rating">
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <span className="d-inline-block average-rating">
                            (17)
                          </span>
                        </div>
                        <ul className="available-info">
                          <li>
                            <i className="fas fa-map-marker-alt"></i> Florida,
                            USA
                          </li>
                          <li>
                            <i className="far fa-clock"></i> Available on Fri,
                            22 Mar
                          </li>
                          <li>
                            <i className="far fa-money-bill-alt"></i> $300 -
                            $1000
                            <i
                              className="fas fa-info-circle"
                              data-toggle="tooltip"
                              title="Lorem Ipsum"
                            ></i>
                          </li>
                        </ul>
                        <div className="row row-sm">
                          <div className="col-6">
                            <a
                              href="doctor-profile.html"
                              className="btn view-btn"
                            >
                              View Profile
                            </a>
                          </div>
                          <div className="col-6">
                            <a href="booking.html" className="btn book-btn">
                              Book Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Doctor Widget --> */}

                    {/* <!-- Doctor Widget --> */}
                    <div className="profile-widget">
                      <div className="doc-img">
                        <a href="doctor-profile.html">
                          <img
                            className="img-fluid"
                            alt="User Image"
                            src="/assets/img/doctors/doctor-02.jpg"
                          />
                        </a>
                        <a href="/" className="fav-btn">
                          <i className="far fa-bookmark"></i>
                        </a>
                      </div>
                      <div className="pro-content">
                        <h3 className="title">
                          <a href="doctor-profile.html">Darren Elder</a>
                          <i className="fas fa-check-circle verified"></i>
                        </h3>
                        <p className="speciality">
                          BDS, MDS - Oral & Maxillofacial Surgery
                        </p>
                        <div className="rating">
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star"></i>
                          <span className="d-inline-block average-rating">
                            (35)
                          </span>
                        </div>
                        <ul className="available-info">
                          <li>
                            <i className="fas fa-map-marker-alt"></i> Newyork,
                            USA
                          </li>
                          <li>
                            <i className="far fa-clock"></i> Available on Fri,
                            22 Mar
                          </li>
                          <li>
                            <i className="far fa-money-bill-alt"></i> $50 - $300
                            <i
                              className="fas fa-info-circle"
                              data-toggle="tooltip"
                              title="Lorem Ipsum"
                            ></i>
                          </li>
                        </ul>
                        <div className="row row-sm">
                          <div className="col-6">
                            <a
                              href="doctor-profile.html"
                              className="btn view-btn"
                            >
                              View Profile
                            </a>
                          </div>
                          <div className="col-6">
                            <a href="booking.html" className="btn book-btn">
                              Book Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Doctor Widget --> */}

                    {/* <!-- Doctor Widget --> */}
                    <div className="profile-widget">
                      <div className="doc-img">
                        <a href="doctor-profile.html">
                          <img
                            className="img-fluid"
                            alt="User Image"
                            src="/assets/img/doctors/doctor-03.jpg"
                          />
                        </a>
                        <a href="/" className="fav-btn">
                          <i className="far fa-bookmark"></i>
                        </a>
                      </div>
                      <div className="pro-content">
                        <h3 className="title">
                          <a href="doctor-profile.html">Deborah Angel</a>
                          <i className="fas fa-check-circle verified"></i>
                        </h3>
                        <p className="speciality">
                          MBBS, MD - General Medicine, DNB - Cardiology
                        </p>
                        <div className="rating">
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star"></i>
                          <span className="d-inline-block average-rating">
                            (27)
                          </span>
                        </div>
                        <ul className="available-info">
                          <li>
                            <i className="fas fa-map-marker-alt"></i> Georgia,
                            USA
                          </li>
                          <li>
                            <i className="far fa-clock"></i> Available on Fri,
                            22 Mar
                          </li>
                          <li>
                            <i className="far fa-money-bill-alt"></i> $100 -
                            $400
                            <i
                              className="fas fa-info-circle"
                              data-toggle="tooltip"
                              title="Lorem Ipsum"
                            ></i>
                          </li>
                        </ul>
                        <div className="row row-sm">
                          <div className="col-6">
                            <a
                              href="doctor-profile.html"
                              className="btn view-btn"
                            >
                              View Profile
                            </a>
                          </div>
                          <div className="col-6">
                            <a href="booking.html" className="btn book-btn">
                              Book Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Doctor Widget --> */}

                    {/* <!-- Doctor Widget --> */}
                    <div className="profile-widget">
                      <div className="doc-img">
                        <a href="doctor-profile.html">
                          <img
                            className="img-fluid"
                            alt="User Image"
                            src="/assets/img/doctors/doctor-04.jpg"
                          />
                        </a>
                        <a href="/" className="fav-btn">
                          <i className="far fa-bookmark"></i>
                        </a>
                      </div>
                      <div className="pro-content">
                        <h3 className="title">
                          <a href="doctor-profile.html">Sofia Brient</a>
                          <i className="fas fa-check-circle verified"></i>
                        </h3>
                        <p className="speciality">
                          MBBS, MS - General Surgery, MCh - Urology
                        </p>
                        <div className="rating">
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star"></i>
                          <span className="d-inline-block average-rating">
                            (4)
                          </span>
                        </div>
                        <ul className="available-info">
                          <li>
                            <i className="fas fa-map-marker-alt"></i> Louisiana,
                            USA
                          </li>
                          <li>
                            <i className="far fa-clock"></i> Available on Fri,
                            22 Mar
                          </li>
                          <li>
                            <i className="far fa-money-bill-alt"></i> $150 -
                            $250
                            <i
                              className="fas fa-info-circle"
                              data-toggle="tooltip"
                              title="Lorem Ipsum"
                            ></i>
                          </li>
                        </ul>
                        <div className="row row-sm">
                          <div className="col-6">
                            <a
                              href="doctor-profile.html"
                              className="btn view-btn"
                            >
                              View Profile
                            </a>
                          </div>
                          <div className="col-6">
                            <a href="booking.html" className="btn book-btn">
                              Book Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Doctor Widget --> */}

                    {/* <!-- Doctor Widget --> */}
                    <div className="profile-widget">
                      <div className="doc-img">
                        <a href="doctor-profile.html">
                          <img
                            className="img-fluid"
                            alt="User Image"
                            src="/assets/img/doctors/doctor-05.jpg"
                          />
                        </a>
                        <a href="/" className="fav-btn">
                          <i className="far fa-bookmark"></i>
                        </a>
                      </div>
                      <div className="pro-content">
                        <h3 className="title">
                          <a href="doctor-profile.html">Marvin Campbell</a>
                          <i className="fas fa-check-circle verified"></i>
                        </h3>
                        <p className="speciality">
                          MBBS, MD - Ophthalmology, DNB - Ophthalmology
                        </p>
                        <div className="rating">
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star"></i>
                          <span className="d-inline-block average-rating">
                            (66)
                          </span>
                        </div>
                        <ul className="available-info">
                          <li>
                            <i className="fas fa-map-marker-alt"></i> Michigan,
                            USA
                          </li>
                          <li>
                            <i className="far fa-clock"></i> Available on Fri,
                            22 Mar
                          </li>
                          <li>
                            <i className="far fa-money-bill-alt"></i> $50 - $700
                            <i
                              className="fas fa-info-circle"
                              data-toggle="tooltip"
                              title="Lorem Ipsum"
                            ></i>
                          </li>
                        </ul>
                        <div className="row row-sm">
                          <div className="col-6">
                            <a
                              href="doctor-profile.html"
                              className="btn view-btn"
                            >
                              View Profile
                            </a>
                          </div>
                          <div className="col-6">
                            <a href="booking.html" className="btn book-btn">
                              Book Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Doctor Widget --> */}

                    {/* <!-- Doctor Widget --> */}
                    <div className="profile-widget">
                      <div className="doc-img">
                        <a href="doctor-profile.html">
                          <img
                            className="img-fluid"
                            alt="User Image"
                            src="/assets/img/doctors/doctor-06.jpg"
                          />
                        </a>
                        <a href="/" className="fav-btn">
                          <i className="far fa-bookmark"></i>
                        </a>
                      </div>
                      <div className="pro-content">
                        <h3 className="title">
                          <a href="doctor-profile.html">Katharine Berthold</a>
                          <i className="fas fa-check-circle verified"></i>
                        </h3>
                        <p className="speciality">
                          MS - Orthopaedics, MBBS, M.Ch - Orthopaedics
                        </p>
                        <div className="rating">
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star"></i>
                          <span className="d-inline-block average-rating">
                            (52)
                          </span>
                        </div>
                        <ul className="available-info">
                          <li>
                            <i className="fas fa-map-marker-alt"></i> Texas, USA
                          </li>
                          <li>
                            <i className="far fa-clock"></i> Available on Fri,
                            22 Mar
                          </li>
                          <li>
                            <i className="far fa-money-bill-alt"></i> $100 -
                            $500
                            <i
                              className="fas fa-info-circle"
                              data-toggle="tooltip"
                              title="Lorem Ipsum"
                            ></i>
                          </li>
                        </ul>
                        <div className="row row-sm">
                          <div className="col-6">
                            <a
                              href="doctor-profile.html"
                              className="btn view-btn"
                            >
                              View Profile
                            </a>
                          </div>
                          <div className="col-6">
                            <a href="booking.html" className="btn book-btn">
                              Book Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Doctor Widget --> */}

                    {/* <!-- Doctor Widget --> */}
                    <div className="profile-widget">
                      <div className="doc-img">
                        <a href="doctor-profile.html">
                          <img
                            className="img-fluid"
                            alt="User Image"
                            src="/assets/img/doctors/doctor-07.jpg"
                          />
                        </a>
                        <a href="/" className="fav-btn">
                          <i className="far fa-bookmark"></i>
                        </a>
                      </div>
                      <div className="pro-content">
                        <h3 className="title">
                          <a href="doctor-profile.html">Linda Tobin</a>
                          <i className="fas fa-check-circle verified"></i>
                        </h3>
                        <p className="speciality">
                          MBBS, MD - General Medicine, DM - Neurology
                        </p>
                        <div className="rating">
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star"></i>
                          <span className="d-inline-block average-rating">
                            (43)
                          </span>
                        </div>
                        <ul className="available-info">
                          <li>
                            <i className="fas fa-map-marker-alt"></i> Kansas,
                            USA
                          </li>
                          <li>
                            <i className="far fa-clock"></i> Available on Fri,
                            22 Mar
                          </li>
                          <li>
                            <i className="far fa-money-bill-alt"></i> $100 -
                            $1000
                            <i
                              className="fas fa-info-circle"
                              data-toggle="tooltip"
                              title="Lorem Ipsum"
                            ></i>
                          </li>
                        </ul>
                        <div className="row row-sm">
                          <div className="col-6">
                            <a
                              href="doctor-profile.html"
                              className="btn view-btn"
                            >
                              View Profile
                            </a>
                          </div>
                          <div className="col-6">
                            <a href="booking.html" className="btn book-btn">
                              Book Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Doctor Widget --> */}

                    {/* <!-- Doctor Widget --> */}
                    <div className="profile-widget">
                      <div className="doc-img">
                        <a href="doctor-profile.html">
                          <img
                            className="img-fluid"
                            alt="User Image"
                            src="/assets/img/doctors/doctor-08.jpg"
                          />
                        </a>
                        <a href="/" className="fav-btn">
                          <i className="far fa-bookmark"></i>
                        </a>
                      </div>
                      <div className="pro-content">
                        <h3 className="title">
                          <a href="doctor-profile.html">Paul Richard</a>
                          <i className="fas fa-check-circle verified"></i>
                        </h3>
                        <p className="speciality">
                          MBBS, MD - Dermatology , Venereology & Lepros
                        </p>
                        <div className="rating">
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star"></i>
                          <span className="d-inline-block average-rating">
                            (49)
                          </span>
                        </div>
                        <ul className="available-info">
                          <li>
                            <i className="fas fa-map-marker-alt"></i>{" "}
                            California, USA
                          </li>
                          <li>
                            <i className="far fa-clock"></i> Available on Fri,
                            22 Mar
                          </li>
                          <li>
                            <i className="far fa-money-bill-alt"></i> $100 -
                            $400
                            <i
                              className="fas fa-info-circle"
                              data-toggle="tooltip"
                              title="Lorem Ipsum"
                            ></i>
                          </li>
                        </ul>
                        <div className="row row-sm">
                          <div className="col-6">
                            <a
                              href="doctor-profile.html"
                              className="btn view-btn"
                            >
                              View Profile
                            </a>
                          </div>
                          <div className="col-6">
                            <a href="booking.html" className="btn book-btn">
                              Book Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Doctor Widget --> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- /Popular Section --> */}

          {/* <!-- Availabe Features --> */}
          <section className="section section-features">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-5 features-img">
                  <img
                    src="/assets/img/features/feature.png"
                    className="img-fluid"
                    alt="Feature"
                  />
                </div>
                <div className="col-md-7">
                  <div className="section-header">
                    <h2 className="mt-2">Availabe Features in Our Clinic</h2>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout.{" "}
                    </p>
                  </div>
                  <div className="features-slider slider">
                    {/* <!-- Slider Item --> */}
                    <div className="feature-item text-center">
                      <img
                        src="/assets/img/features/feature-01.jpg"
                        className="img-fluid"
                        alt="Feature"
                      />
                      <p>Patient Ward</p>
                    </div>
                    {/* <!-- /Slider Item --> */}

                    {/* <!-- Slider Item --> */}
                    <div className="feature-item text-center">
                      <img
                        src="/assets/img/features/feature-02.jpg"
                        className="img-fluid"
                        alt=" Feature"
                      />
                      <p>Test Room</p>
                    </div>
                    {/* <!-- /Slider Item --> */}

                    {/* <!-- Slider Item --> */}
                    <div className="feature-item text-center">
                      <img
                        src="/assets/img/features/feature-03.jpg"
                        className="img-fluid"
                        alt="Feature"
                      />
                      <p>ICU</p>
                    </div>
                    {/* <!-- /Slider Item --> */}

                    {/* <!-- Slider Item --> */}
                    <div className="feature-item text-center">
                      <img
                        src="/assets/img/features/feature-04.jpg"
                        className="img-fluid"
                        alt="Feature"
                      />
                      <p>Laboratory</p>
                    </div>
                    {/* <!-- /Slider Item --> */}

                    {/* <!-- Slider Item --> */}
                    <div className="feature-item text-center">
                      <img
                        src="/assets/img/features/feature-05.jpg"
                        className="img-fluid"
                        alt="Feature"
                      />
                      <p>Operation</p>
                    </div>
                    {/* <!-- /Slider Item --> */}

                    {/* <!-- Slider Item --> */}
                    <div className="feature-item text-center">
                      <img
                        src="/assets/img/features/feature-06.jpg"
                        className="img-fluid"
                        alt="Feature"
                      />
                      <p>Medical</p>
                    </div>
                    {/* <!-- /Slider Item --> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- /Availabe Features --> */}

          {/* <!-- Blog Section --> */}
          <section className="section section-blogs">
            <div className="container-fluid">
              {/* <!-- Section Header --> */}
              <div className="section-header text-center">
                <h2>Blogs and News</h2>
                <p className="sub-title">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              {/* <!-- /Section Header --> */}

              <div className="row blog-grid-row">
                <div className="col-md-6 col-lg-3 col-sm-12">
                  {/* <!-- Blog Post --> */}
                  <div className="blog grid-blog">
                    <div className="blog-image">
                      <a href="blog-details.html">
                        <img
                          className="img-fluid"
                          src="/assets/img/blog/blog-01.jpg"
                          alt="Post Image"
                        />
                      </a>
                    </div>
                    <div className="blog-content">
                      <ul className="entry-meta meta-item">
                        <li>
                          <div className="post-author">
                            <a href="doctor-profile.html">
                              <img
                                src="/assets/img/doctors/doctor-thumb-01.jpg"
                                alt="Post Author"
                              />{" "}
                              <span>Dr. Ruby Perrin</span>
                            </a>
                          </div>
                        </li>
                        <li>
                          <i className="far fa-clock"></i> 4 Dec 2019
                        </li>
                      </ul>
                      <h3 className="blog-title">
                        <a href="blog-details.html">
                          Doccure – Making your clinic painless visit?
                        </a>
                      </h3>
                      <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur em adipiscing
                        elit, sed do eiusmod tempor.
                      </p>
                    </div>
                  </div>
                  {/* <!-- /Blog Post --> */}
                </div>
                <div className="col-md-6 col-lg-3 col-sm-12">
                  {/* <!-- Blog Post --> */}
                  <div className="blog grid-blog">
                    <div className="blog-image">
                      <a href="blog-details.html">
                        <img
                          className="img-fluid"
                          src="/assets/img/blog/blog-02.jpg"
                          alt="Post Image"
                        />
                      </a>
                    </div>
                    <div className="blog-content">
                      <ul className="entry-meta meta-item">
                        <li>
                          <div className="post-author">
                            <a href="doctor-profile.html">
                              <img
                                src="/assets/img/doctors/doctor-thumb-02.jpg"
                                alt="Post Author"
                              />{" "}
                              <span>Dr. Darren Elder</span>
                            </a>
                          </div>
                        </li>
                        <li>
                          <i className="far fa-clock"></i> 3 Dec 2019
                        </li>
                      </ul>
                      <h3 className="blog-title">
                        <a href="blog-details.html">
                          What are the benefits of Online Doctor Booking?
                        </a>
                      </h3>
                      <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur em adipiscing
                        elit, sed do eiusmod tempor.
                      </p>
                    </div>
                  </div>
                  {/* <!-- /Blog Post --> */}
                </div>
                <div className="col-md-6 col-lg-3 col-sm-12">
                  {/* <!-- Blog Post --> */}
                  <div className="blog grid-blog">
                    <div className="blog-image">
                      <a href="blog-details.html">
                        <img
                          className="img-fluid"
                          src="/assets/img/blog/blog-03.jpg"
                          alt="Post Image"
                        />
                      </a>
                    </div>
                    <div className="blog-content">
                      <ul className="entry-meta meta-item">
                        <li>
                          <div className="post-author">
                            <a href="doctor-profile.html">
                              <img
                                src="/assets/img/doctors/doctor-thumb-03.jpg"
                                alt="Post Author"
                              />{" "}
                              <span>Dr. Deborah Angel</span>
                            </a>
                          </div>
                        </li>
                        <li>
                          <i className="far fa-clock"></i> 3 Dec 2019
                        </li>
                      </ul>
                      <h3 className="blog-title">
                        <a href="blog-details.html">
                          Benefits of consulting with an Online Doctor
                        </a>
                      </h3>
                      <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur em adipiscing
                        elit, sed do eiusmod tempor.
                      </p>
                    </div>
                  </div>
                  {/* <!-- /Blog Post --> */}
                </div>
                <div className="col-md-6 col-lg-3 col-sm-12">
                  {/* <!-- Blog Post --> */}
                  <div className="blog grid-blog">
                    <div className="blog-image">
                      <a href="blog-details.html">
                        <img
                          className="img-fluid"
                          src="/assets/img/blog/blog-04.jpg"
                          alt="Post Image"
                        />
                      </a>
                    </div>
                    <div className="blog-content">
                      <ul className="entry-meta meta-item">
                        <li>
                          <div className="post-author">
                            <a href="doctor-profile.html">
                              <img
                                src="/assets/img/doctors/doctor-thumb-04.jpg"
                                alt="Post Author"
                              />{" "}
                              <span>Dr. Sofia Brient</span>
                            </a>
                          </div>
                        </li>
                        <li>
                          <i className="far fa-clock"></i> 2 Dec 2019
                        </li>
                      </ul>
                      <h3 className="blog-title">
                        <a href="blog-details.html">
                          5 Great reasons to use an Online Doctor
                        </a>
                      </h3>
                      <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur em adipiscing
                        elit, sed do eiusmod tempor.
                      </p>
                    </div>
                  </div>
                  {/* <!-- /Blog Post --> */}
                </div>
              </div>
              <div className="view-all text-center">
                <a href="blog-list.html" className="btn btn-primary">
                  View All
                </a>
              </div>
            </div>
          </section>
          {/* <!-- /Blog Section --> */}
        </div>
        {/* <!-- /Main Wrapper --> */}
      </div>
    </>
  );
}

export default HomePage;
