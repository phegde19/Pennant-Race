function Team({ team, seed }) {
    return (
      <div className="team-card">
        <img
          src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`}
          alt={team.name}
          className="tree-logo"
        />
  
        <div>
          <div>
            {seed ? `(${seed}) ` : ""}
            {team.name}
          </div>
  
          <small>{team.projectedWins} wins</small>
        </div>
      </div>
    );
  }
  
  export default function PlayoffTree({ al, nl }) {
    const alWCWinner1 =
      al.seed3.projectedWins > al.wc3.projectedWins
        ? al.seed3
        : al.wc3;
  
    const alWCWinner2 =
      al.wc1.projectedWins > al.wc2.projectedWins
        ? al.wc1
        : al.wc2;
  
    const alDSWinner1 =
      al.seed1.projectedWins > alWCWinner1.projectedWins
        ? al.seed1
        : alWCWinner1;
  
    const alDSWinner2 =
      al.seed2.projectedWins > alWCWinner2.projectedWins
        ? al.seed2
        : alWCWinner2;
  
    const alChampion =
      alDSWinner1.projectedWins > alDSWinner2.projectedWins
        ? alDSWinner1
        : alDSWinner2;
  
    const nlWCWinner1 =
      nl.seed3.projectedWins > nl.wc3.projectedWins
        ? nl.seed3
        : nl.wc3;
  
    const nlWCWinner2 =
      nl.wc1.projectedWins > nl.wc2.projectedWins
        ? nl.wc1
        : nl.wc2;
  
    const nlDSWinner1 =
      nl.seed1.projectedWins > nlWCWinner1.projectedWins
        ? nl.seed1
        : nlWCWinner1;
  
    const nlDSWinner2 =
      nl.seed2.projectedWins > nlWCWinner2.projectedWins
        ? nl.seed2
        : nlWCWinner2;
  
    const nlChampion =
      nlDSWinner1.projectedWins > nlDSWinner2.projectedWins
        ? nlDSWinner1
        : nlDSWinner2;
  
    const worldChampion =
      alChampion.projectedWins > nlChampion.projectedWins
        ? alChampion
        : nlChampion;
  
    return (
      <div className="playoff-tree-layout">
  
        {/* AMERICAN LEAGUE */}
  
        <div className="league-half">
  
          <h2 className="al-title">American League</h2>
  
          <div className="bracket-columns">
  
            {/* WILD CARD */}
  
            <div className="round">
  
              <h3>Wild Card</h3>
  
              <div className="round-group">
                <Team team={al.seed3} seed="3" />
                <Team team={al.wc3} seed="WC3" />
              </div>
  
              <div className="round-group">
                <Team team={al.wc1} seed="WC1" />
                <Team team={al.wc2} seed="WC2" />
              </div>
  
            </div>
  
            {/* ALDS */}
  
            <div className="round">
  
              <h3>ALDS</h3>
  
              <div className="round-group">
                <Team team={al.seed1} seed="1" />
                <Team team={alWCWinner1} />
              </div>
  
              <div className="round-group">
                <Team team={al.seed2} seed="2" />
                <Team team={alWCWinner2} />
              </div>
  
            </div>
  
            {/* ALCS */}
  
            <div className="round">
  
              <h3>ALCS</h3>
  
              <div className="round-group">
                <Team team={alDSWinner1} />
                <Team team={alDSWinner2} />
              </div>
  
            </div>
  
          </div>
  
        </div>
  
        {/* WORLD SERIES */}
  
        <div className="world-series-column">
  
          <h2>World Series</h2>
  
          <div className="world-series-box">
            <Team team={alChampion} />
            <Team team={nlChampion} />
          </div>
  
          <div className="champion-box">
  
            <img
              src={`https://www.mlbstatic.com/team-logos/${worldChampion.id}.svg`}
              alt={worldChampion.name}
              className="champion-logo"
            />
  
            <h3>Champion</h3>
  
            <p>{worldChampion.name}</p>
  
          </div>
  
        </div>
  
        {/* NATIONAL LEAGUE */}
  
        <div className="league-half">
  
          <h2 className="nl-title">National League</h2>
  
          <div className="bracket-columns">
  
            {/* NLCS */}
  
            <div className="round">
  
              <h3>NLCS</h3>
  
              <div className="round-group">
                <Team team={nlDSWinner1} />
                <Team team={nlDSWinner2} />
              </div>
  
            </div>
  
            {/* NLDS */}
  
            <div className="round">
  
              <h3>NLDS</h3>
  
              <div className="round-group">
                <Team team={nl.seed1} seed="1" />
                <Team team={nlWCWinner1} />
              </div>
  
              <div className="round-group">
                <Team team={nl.seed2} seed="2" />
                <Team team={nlWCWinner2} />
              </div>
  
            </div>
  
            {/* WILD CARD */}
  
            <div className="round">
  
              <h3>Wild Card</h3>
  
              <div className="round-group">
                <Team team={nl.seed3} seed="3" />
                <Team team={nl.wc3} seed="WC3" />
              </div>
  
              <div className="round-group">
                <Team team={nl.wc1} seed="WC1" />
                <Team team={nl.wc2} seed="WC2" />
              </div>
  
            </div>
  
          </div>
  
        </div>
  
      </div>
    );
  }