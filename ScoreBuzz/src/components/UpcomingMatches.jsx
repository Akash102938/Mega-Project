import React, { useEffect, useState } from "react";
import {
  upcomingMatchesStyles,
  pickColors,
  getGradientStyle,
} from "../assets/dummyStyles";
import Loader from "./Loader";
import { flagForTeamName } from "./Flag";
import { getUpcomingMatches } from "../api/cricApi"; // <-- make sure path is correct

function UpcomingMatches({ onSelect }) {
  const [groups, setGroups] = useState([]);
  const [raw, setRaw] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [quotaMode, setQuotaMode] = useState(false);

  // ---- Format timestamp ----
  const fmtEpochString = (val) => {
    if (!val) return "";
    const n = Number(val);
    if (isNaN(n)) return String(val);

    const ms = n < 1e12 && n > 1e9 ? n * 1000 : n;
    const date = new Date(ms);
    if (isNaN(date.getTime())) return String(val);

    return date.toLocaleString();
  };

  // ---- Extract matches & group ----
  const extractAndGroup = (payload) => {
    if (!payload) return [];

    const root = payload.data ?? payload;
    const typeMatches = root.typeMatches || root.type_matches || root;

    if (!Array.isArray(typeMatches)) return [];

    const allMatches = [];

    for (const tm of typeMatches) {
      const seriesMatches = tm.seriesMatches || tm.series_matches || [];

      for (const sEntry of seriesMatches) {
        const wrapper = sEntry.seriesAdWrapper || sEntry;
        const matches =
          wrapper.matches || wrapper.matchesList || sEntry.matches || [];

        if (!Array.isArray(matches)) continue;

        for (const mm of matches) {
          const info = mm.matchInfo || mm.matchinfo || mm;
          const t1 = info.team1 || info.teamA || {};
          const t2 = info.team2 || info.teamB || {};

          const start = info.startDate || info.start || info.startTime || "";

          const seriesName =
            wrapper.seriesName ||
            sEntry.seriesName ||
            info.seriesName ||
            "All Matches";

          allMatches.push({
            matchId: String(info.matchId ?? `${t1.teamName}-${t2.teamName}`),
            series: seriesName,
            team1: { name: t1.teamSName || t1.teamName || "Team 1" },
            team2: { name: t2.teamSName || t2.teamName || "Team 2" },
            time: fmtEpochString(start),
            venue: info.venueInfo?.ground || info.venueInfo?.city || "",
            raw: mm,
          });
        }
      }
    }

    // ---- Group by series ----
    const grouped = {};
    for (const m of allMatches) {
      if (!grouped[m.series]) grouped[m.series] = [];
      if (!grouped[m.series].find((x) => x.matchId === m.matchId)) {
        grouped[m.series].push(m);
      }
    }

    return Object.keys(grouped).map((series) => ({
      title: series,
      matches: grouped[series],
    }));
  };

  // ---- Fetch matches ----
  const fetchUpcoming = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getUpcomingMatches({ cacheTTL: 300 });
      const payload = res.data ?? res.rawResponse?.data ?? res;

      setRaw(payload);
      setQuotaMode(Boolean(res.quotaExceeded || res.fallback));
      setGroups(extractAndGroup(payload));
      setLastUpdated(new Date());
    } catch (err) {
      console.error("UpcomingMatches error:", err);
      setError(err?.message || "Failed to load upcoming matches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcoming();
  }, []);

  // ---- Team Flag UI ----
  function Flag({ name }) {
    const f = flagForTeamName(name);
    const srcPng = f?.srcPng;
    const srcSvg = f?.srcSvg;
    const emoji = f?.emoji;
    const initials = f?.initials;
    const label = f?.label ?? name;

    const [src, setSrc] = useState(srcPng || srcSvg);
    const [triedSvg, setTriedSvg] = useState(false);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
      setSrc(srcPng || srcSvg);
      setImgError(false);
      setTriedSvg(false);
    }, [name]);

    const onImgError = () => {
      if (srcSvg && !triedSvg) {
        setSrc(srcSvg);
        setTriedSvg(true);
        return;
      }
      setImgError(true);
    };

    if (src && !imgError)
      return (
        <img
          src={src}
          alt={`${label} flag`}
          className={upcomingMatchesStyles.flagImage}
          onError={onImgError}
        />
      );

    if (emoji)
      return (
        <div className={upcomingMatchesStyles.emojiContainer}>{emoji}</div>
      );

    const text =
      initials ||
      label
        .split(" ")
        .map((w) => w[0] || "")
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const [c1, c2] = pickColors(label);

    return (
      <div
        className={upcomingMatchesStyles.initialsContainer}
        style={getGradientStyle(c1, c2)}
      >
        <span className="text-xs">{text}</span>
      </div>
    );
  }

  // ---- Loading ----
  if (loading && groups.length === 0)
    return (
      <div className={upcomingMatchesStyles.loadingContainer}>
        <Loader message="Loading upcoming" />
      </div>
    );

  // ---- Error ----
  if (error)
    return (
      <div className={upcomingMatchesStyles.errorContainer}>Error: {error}</div>
    );

  // ---- UI ----
  return (
    <div className={upcomingMatchesStyles.container}>
      {/* Header */}
      <div className={upcomingMatchesStyles.headerContainer}>
        <div>
          <div className={upcomingMatchesStyles.headerTitle}>
            Upcoming Matches
          </div>
          <div className={upcomingMatchesStyles.headerSubtitle}>
            Manual refresh – process quota
          </div>
        </div>

        <div className="flex items-center gap-3">
          {lastUpdated && (
            <div className={upcomingMatchesStyles.lastUpdatedText}>
              Last: {lastUpdated.toLocaleString()}
            </div>
          )}

          <button
            onClick={fetchUpcoming}
            disabled={loading}
            className={upcomingMatchesStyles.refreshButton}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Groups */}
      {groups.length > 0 ? (
        <div className={upcomingMatchesStyles.groupsContainer}>
          {groups.map((group, gi) => (
            <section key={gi} className={upcomingMatchesStyles.seriesSection}>
              <div className={upcomingMatchesStyles.seriesHeader}>
                <div>
                  <div className={upcomingMatchesStyles.seriesTitle}>
                    {group.title}
                  </div>
                  <div className={upcomingMatchesStyles.seriesMatchCount}>
                    {group.matches.length} match
                    {group.matches.length > 1 ? "es" : ""}
                  </div>
                </div>
                <div className={upcomingMatchesStyles.seriesLabel}>Series</div>
              </div>

              {/* Matches */}
              <div className={upcomingMatchesStyles.matchesGrid}>
                {group.matches.map((m) => (
                  <article
                    key={m.matchId}
                    className={upcomingMatchesStyles.matchArticle}
                    onClick={() => onSelect?.(m.matchId)}
                  >
                    <div className={upcomingMatchesStyles.matchArticleInner}>
                      {/* Header */}
                      <div className={upcomingMatchesStyles.matchHeader}>
                        <div className={upcomingMatchesStyles.matchTime}>
                          {m.time || "TBA"}
                        </div>
                        <div className={upcomingMatchesStyles.matchVenue}>
                          {m.venue}
                        </div>
                      </div>

                      {/* Teams */}
                      <div className={upcomingMatchesStyles.teamsContainer}>
                        <div className={upcomingMatchesStyles.teamContainer}>
                          <Flag name={m.team1.name} />
                          <div>
                            <div className={upcomingMatchesStyles.teamName}>
                              {m.team1.name}
                            </div>
                            <div className={upcomingMatchesStyles.teamStatus}>
                              Upcoming
                            </div>
                          </div>
                        </div>

                        <div className={upcomingMatchesStyles.vsText}>vs</div>

                        <div
                          className={
                            upcomingMatchesStyles.teamContainerReversed
                          }
                        >
                          <div className="text-right">
                            <div className={upcomingMatchesStyles.teamName}>
                              {m.team2.name}
                            </div>
                          </div>
                          <Flag name={m.team2.name} />
                        </div>
                      </div>

                      {/* Footer */}
                      <div className={upcomingMatchesStyles.matchFooter}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelect?.(m.matchId);
                          }}
                          className={upcomingMatchesStyles.detailsButton}
                        >
                          Details
                        </button>

                        <div className={upcomingMatchesStyles.matchDate}>
                          {m.time ? m.time.split(",")[0] : "TBA"}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className={upcomingMatchesStyles.noMatchesContainer}>
          <div>No upcoming matches parsed. Raw API response below:</div>
          <pre className={upcomingMatchesStyles.rawDataPre}>
            {JSON.stringify(raw ?? {}, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default UpcomingMatches;
