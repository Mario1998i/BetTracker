import "../styles/Home.css";
import football from "../assets/football-silhouette.png";
import basketball from "../assets/basketball-silhouette.png";

export default function Home() {
    return (
        <main className="home">
            <img className="sport-silhouette football" src={football} />
            <img className="sport-silhouette basketball" src={basketball} />

            <div className="glow-point"></div>
            <div className="glow-point glow-point-small"></div>
            <div className="glow-point glow-point-large"></div>
            
            <section className="hero">
                <h1>BetTracker</h1>
                <p>Segui e analizza i migliori tipster sportivi</p>
            </section>


            <section className="features">
                <div className="feature-card">
                    <h2>✓</h2>
                    <h3>Pronostici verificati</h3>
                    <p>Consulta pronostici pubblicati dai nostri tipster.</p>
                </div>

                <div className="feature-card">
                    <h2>📊</h2>
                    <h3>Statistiche aggiornate</h3>
                    <p>Analizza i risultati e le statistiche dei pronostici.</p>
                </div>

                <div className="feature-card">
                    <h2>🏆</h2>
                    <h3>Performance dei tipster</h3>
                    <p>Confronta le performance dei diversi tipster.</p>
                </div>     
            </section>
        </main>
    );
}