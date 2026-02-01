export default function Home() {
    return (
      <div>
  
        {/* Hero Banner */}
        <section
          style={{
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/previews/029/562/459/non_2x/farmer-works-on-farm-free-photo.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            textAlign: "center",
            padding: "80px 20px",
            minHeight: "550px",
          }}
        >
          <h1 style={{ fontSize: "40px", fontWeight: "bold" }}>
            Local Farmer’s Direct Market
          </h1>
          <p style={{ fontSize: "18px", marginTop: "10px" }}>
            Connecting Farmers Directly With Consumers 🚜🥦  
            Fair Prices | Fresh Produce | No Middlemen
          </p>
          <a href="/products">
            <button style={{ marginTop: "20px" }}>Shop Now</button>
          </a>
        </section>
  
        {/* About Us Section */}
        <section style={styles.section}>
          <h2 style={styles.heading}>Why Our Platform?</h2>
          <p style={styles.text}>
            Our mission is to support local farmers by helping them sell their
            fresh produce directly to consumers without middlemen. This increases
            farmer income and provides people with chemical-free food.
          </p>
  
          <div style={styles.cardContainer}>
            <div style={styles.infoCard}>
              <img src="https://terratech.vn/assets/img/hero-carousel/slide-3.jpg"
                alt="Farmer"
                style={styles.cardImg}
              />
              <h3>Empowering Farmers</h3>
              <p>We make sure farmers get the right value for their hard work.</p>
            </div>
  
            <div style={styles.infoCard}>
              <img src="https://img.freepik.com/premium-photo/fresh-vegetables-fruits-large-farms-harvesting_1417-20810.jpg?w=2000"
                alt="Fresh Produce"
                style={styles.cardImg}
              />
              <h3>Fresh & Healthy Food</h3>
              <p>Consumers get farm-fresh vegetables and fruits directly.</p>
            </div>
  
            <div style={styles.infoCard}>
              <img src="https://www.deere.ca/assets/images/region-4/products/harvesting/tseries-combine-r2C001197-1920x1080.jpg"
                alt="Technology"
                style={styles.cardImg}
              />
              <h3>Digital India Support</h3>
              <p>We promote the Govt. initiative to digitize agriculture.</p>
            </div>
          </div>
        </section>
     {/* Mission Highlight Section */}
<section style={styles.missionSection}>
  <div style={styles.missionHeader}>
    <h2 style={styles.missionTitle}>Our Mission</h2>
    <div style={styles.line}></div>
    <p style={styles.subtext}>
      Supporting Farmers | Delivering Fresh Food | Empowering Rural India
    </p>
  </div>

  <div style={styles.missionCards}>
    <div style={styles.missionCard}>
      <span style={styles.icon}>🌾</span>
      <p>
        Empower farmers by providing them a fair marketplace where they sell
        directly to consumers at the right price.
      </p>
    </div>

    <div style={styles.missionCard}>
      <span style={styles.icon}>🥗</span>
      <p>
        Make fresh, healthy, and chemical-free food accessible to every family
        at affordable rates.
      </p>
    </div>

    <div style={styles.missionCard}>
      <span style={styles.icon}>📡</span>
      <p>
        Promote Digital India by modernizing agriculture with technology that
        supports rural economic growth.
      </p>
    </div>
  </div>
</section>


        
  
        {/* Footer */}
        <footer style={styles.footer}>
          © 2025 Local Farmer’s Direct Market — Supporting Indian Agriculture 🌾
        </footer>
  
      </div>
    );
  }
  
  const styles = {
    section: {
      padding: "50px 20px",
      textAlign: "center",
    },
    heading: {
      color: "#1b5e20",
      marginBottom: "20px",
      fontSize: "28px",
    },
    text: {
      maxWidth: "750px",
      margin: "0 auto",
      fontSize: "18px",
      lineHeight: "1.6",
    },
    cardContainer: {
      display: "flex",
      gap: "20px",
      justifyContent: "center",
      marginTop: "30px",
      flexWrap: "wrap",
    },
    infoCard: {
      width: "280px",
      background: "#fff",
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    cardImg: {
      width: "100%",
      height: "150px",
      borderRadius: "10px",
      marginBottom: "10px",
      objectFit: "cover",
    },
    footer: {
      background: "#1b5e20",
      color: "white",
      textAlign: "center",
      padding: "15px",
      marginTop: "40px",
    },
    missionSection: {
        padding: "60px 20px",
        
        background: "url('https://eng.ruralvoice.in/uploads/images/2024/09/image_750x_66d864decc1a8.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        color: "#1a3815",
      },
      
      missionHeader: {
        marginBottom: "35px",
      },
      
      missionTitle: {
        fontSize: "36px",
        fontWeight: "700",
        color: "#262D79",
        marginBottom: "8px",
      },
      
      line: {
        width: "120px",
        height: "5px",
        background: "#4CAF50",
        margin: "0 auto 15px",
        borderRadius: "10px",
      },
      
      subtext: {
        fontSize: "20px",
        fontWeight: "700",
        color: "#ffeb3b",
        textShadow: "0px 3px 6px rgba(0,0,0,0.7)",
        marginBottom: "30px",
      },
      
      
      
      missionCards: {
        display: "flex",
        justifyContent: "center",
        gap: "25px",
        flexWrap: "wrap",
      },
      
      missionCard: {
        width: "280px",
        background: "#ffffffd9",
        backdropFilter: "blur(4px)",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
        transition: "transform 0.3s",
        cursor: "default",
      },
      
      missionCardHover: {
        transform: "translateY(-10px)",
      },
      
      icon: {
        fontSize: "40px",
        marginBottom: "10px",
        color: "#1b5e20",
      },
      
  };
  