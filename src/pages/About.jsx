import React from "react";
import "./About.css";

const About = () => {
  return (
    <main className="about-page bg-dark-blue text-white min-h-screen">
      {/* Header Section */}
      <section className="about-header py-12">
        <div className="container mx-auto">
          <div className="about-box bg-gold text-dark-blue mx-auto rounded-lg shadow-md">
            <h1 className="text-4xl font-bold text-center">About VoluntEasy</h1>
            <p className="text-lg sub mt-4">
              Making volunteering easier and more accessible for everyone.
            </p>
          </div>
        </div>
      </section>

      <section className="about-content py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
          <p className="text-lg mb-12">
            At VoluntEasy, we aim to connect individuals with eco-volunteering
            opportunities, fostering a culture of community service while
            addressing environmental challenges.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-light-blue rounded-lg p-8 shadow-md hover:scale-105 transition-transform">
              <h3 className="text-2xl font-semibold mb-4">Connect</h3>
              <p>
                Bringing volunteers and organizations together to create lasting
                impacts.
              </p>
            </div>
            <div className="bg-light-blue rounded-lg p-8 shadow-md hover:scale-105 transition-transform">
              <h3 className="text-2xl font-semibold mb-4">Track</h3>
              <p>
                Empowering users to monitor their contributions and progress
                with ease.
              </p>
            </div>
            <div className="bg-light-blue rounded-lg p-8 shadow-md hover:scale-105 transition-transform">
              <h3 className="text-2xl font-semibold mb-4">Grow</h3>
              <p>
                Encouraging personal and community growth through meaningful
                volunteer work.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
