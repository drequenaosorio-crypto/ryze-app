export default function Home() {
  return (
    <div style={{
      backgroundColor: 'black',
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '80px 20px 30px 20px',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '62px', fontWeight: '900', letterSpacing: '8px', margin: 0 }}>RYZE</h1>
        <p style={{ fontSize: '19px', letterSpacing: '6px', marginTop: '15px', lineHeight: '28px' }}>
          SALES • JOBS • MEET<br/>PEOPLE
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', width: '100%', maxWidth: '320px' }}>
        
        <div style={{
          border: '1px solid white',
          borderRadius: '30px',
          padding: '10px 24px',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          Tap for Sound 🔊
        </div>

        <a
          href="https://wa.me/18622799086?text=Hola%20RYZE%20quiero%20unirme"
          target="_blank"
          style={{
            backgroundColor: 'white',
            color: 'black',
            width: '100%',
            padding: '18px 0px',
            borderRadius: '50px',
            fontWeight: 'bold',
            fontSize: '20px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'block'
          }}
        >
          Get Started
        </a
