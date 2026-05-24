import React from "react";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.homeGrid}>
      {/* Left Column: Image & QR Code */}
      <div className={styles.leftCol}>
        
        {/* Profile Details Card */}
        <div className={styles.profileCard}>
          <div className={styles.profileImgWrapper}>
            <img 
              src="/profile.png" 
              alt="Shahin" 
              className={styles.profileImg} 
            />
          </div>
          <h2 className={styles.profileName}>Shahin</h2>
        </div>

        {/* Email QR Code Card */}
        <div className={styles.qrCard}>
          <h3 className={styles.qrTitle}>Get in Touch</h3>
          <div className={styles.qrWrapper}>
            <img 
              src="/email-qr.svg" 
              alt="Scan to email me" 
              className={styles.qrImg} 
            />
          </div>
          <span className={styles.qrLabel}>Scan to Email Me</span>
        </div>

      </div>

      {/* Right Column: Biography content */}
      <div className={styles.rightCol}>
        <div className={styles.bioCard}>
          <h2 className={styles.bioHeading}>About Me</h2>
          
          <p className={styles.bioParagraph}>
            Born in Iran and now based in the San Francisco Bay Area, my career and life have been shaped by a lifelong fascination with structure, patterns, and logic. My academic foundation bridges the gap between theoretical foundations and practical application: I hold a Bachelor’s degree in Computer Science, a Master of Science in Mathematics, and spent time pursuing a PhD in Logic at UC Berkeley. That core drive to solve complex puzzles is the thread that connects everything I do.
          </p>

          <p className={styles.bioParagraph}>
            I have been building software since 2000, navigating the evolving tech landscape across several organizations—including an impactful 11-year chapter at SRI International. In 2017, I joined Google, where I continue to solve large-scale engineering problems. Because I believe the best way to honor what you love is to share it, I also step into the classroom part-time to teach discrete mathematics at a local community college.
          </p>

          <p className={styles.bioParagraph}>
            When I’m not writing code or analyzing equations, you can usually find me seeking out new strategic challenges or unwinding with classic interests. Outdoors, I’m typically hiking, camping, or playing soccer. Indoors, I dive into chess matches, tackle deep math puzzles, watch movies, or immerse myself in the rich, timeless depth of Persian poetry.
          </p>
        </div>
      </div>
    </div>
  );
}
