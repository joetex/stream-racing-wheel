import React, { useState } from "react";
import flatstore from "flatstore";
import { MOZA_WHEELS, MOZA_CATEGORIES } from "./MozaCatalog";
import { loadProfile } from "./KeybindProfiles";

function PresetSelector({
    rotation,
    wheelButtonsEnabled,
    showPedals,
    setShowPedals,
    showShifter,
    setShowShifter,
}) {
    const [activeProfile] = flatstore.useWatch("defaultProfile");
    const [currentWheelImg] = flatstore.useWatch("imgWheel");
    const [showAllWheels, setShowAllWheels] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [copied, setCopied] = useState(false);

    const quickPresets = [
        {
            profile: "MOZA R5 Bundle (ES)",
            label: "MOZA R3 / R5 (ES)",
            thumb: `${import.meta.env.BASE_URL.replace(/\/$/, "")}/moza/wheels/es.png`,
        },
        {
            profile: "MOZA CS V2",
            label: "MOZA CS V2",
            thumb: `${import.meta.env.BASE_URL.replace(/\/$/, "")}/moza/wheels/cs_v2.png`,
        },
        {
            profile: "MOZA KS GT",
            label: "MOZA KS GT",
            thumb: `${import.meta.env.BASE_URL.replace(/\/$/, "")}/moza/wheels/ks.png`,
        },
        {
            profile: "G920",
            label: "Logitech G920",
            thumb: `${import.meta.env.BASE_URL.replace(/\/$/, "")}/g920/wheel.png`,
        },
    ];

    const filteredWheels = MOZA_WHEELS.filter((w) => {
        const matchCat = selectedCategory === "All" || w.category === selectedCategory;
        const matchQuery =
            !searchQuery.trim() ||
            w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            w.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchQuery;
    });

    const selectedCatalogWheel = MOZA_WHEELS.find((w) => w.image === currentWheelImg);
    const isCustomMozaWheel =
        selectedCatalogWheel &&
        !quickPresets.some((p) => p.thumb === selectedCatalogWheel.image);

    const handleCopyObsUrl = () => {
        const url = new URL(window.location.href);
        url.search = "";
        url.searchParams.set("obs", "1");
        if (activeProfile) url.searchParams.set("profile", activeProfile);
        if (selectedCatalogWheel) url.searchParams.set("wheel", selectedCatalogWheel.id);
        url.searchParams.set("rotation", String(rotation || 900));
        url.searchParams.set("pedals", showPedals ? "1" : "0");
        url.searchParams.set("shifter", showShifter ? "1" : "0");
        url.searchParams.set("buttons", wheelButtonsEnabled ? "1" : "0");

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url.toString());
        } else {
            window.prompt("Copy this URL for OBS Browser Source:", url.toString());
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSelectWheel = (wheel) => {
        flatstore.set("imgWheel", wheel.image);
        flatstore.set("wheelButtonsEnabled", 0);
        flatstore.set("updatedSettings", Date.now());
        setShowAllWheels(false);
    };

    return (
        <div className="sidebar-card">
            <button
                type="button"
                className="preset-obs-btn preset-obs-primary"
                onClick={handleCopyObsUrl}
                title="Copy direct OBS Browser Source URL with transparent background and current wheel/settings"
            >
                {copied ? "Copied OBS URL!" : "Copy OBS URL"}
            </button>

            <div className="preset-view-toggles">
                <label className="preset-toggle-item">
                    <input
                        type="checkbox"
                        checked={showPedals}
                        onChange={(e) => setShowPedals(e.target.checked)}
                    />
                    <span>Show Pedals</span>
                </label>
                <label className="preset-toggle-item">
                    <input
                        type="checkbox"
                        checked={showShifter}
                        onChange={(e) => setShowShifter(e.target.checked)}
                    />
                    <span>Show Shifter</span>
                </label>
            </div>

            <div className="preset-section-label">Presets</div>
            <div className="preset-quick-grid">
                {quickPresets.map((item) => {
                    const isActive =
                        activeProfile === item.profile && currentWheelImg === item.thumb;
                    return (
                        <button
                            key={item.profile}
                            type="button"
                            className={`preset-pill ${isActive ? "active" : ""}`}
                            onClick={() => {
                                loadProfile(item.profile);
                                setShowAllWheels(false);
                            }}
                        >
                            <img src={item.thumb} alt={item.label} className="preset-pill-thumb" />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </div>

            <button
                type="button"
                className={`preset-pill preset-more-btn ${showAllWheels || isCustomMozaWheel ? "active" : ""}`}
                onClick={() => setShowAllWheels((prev) => !prev)}
            >
                {isCustomMozaWheel && (
                    <img
                        src={selectedCatalogWheel.image}
                        alt={selectedCatalogWheel.name}
                        className="preset-pill-thumb"
                    />
                )}
                <span>
                    {showAllWheels
                        ? "Hide MOZA Wheels ▲"
                        : isCustomMozaWheel
                        ? `${selectedCatalogWheel.name} (${MOZA_WHEELS.length}) ▼`
                        : `All MOZA Wheels (${MOZA_WHEELS.length}) ▼`}
                </span>
            </button>

            {showAllWheels && (
                <div className="moza-drawer">
                    <input
                        type="text"
                        className="moza-search-input"
                        placeholder="Search MOZA wheel..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="moza-category-tabs">
                        {MOZA_CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                className={`moza-cat-btn ${selectedCategory === cat ? "active" : ""}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="moza-wheel-grid">
                        {filteredWheels.map((wheel) => {
                            const isSelected = currentWheelImg === wheel.image;
                            return (
                                <button
                                    key={wheel.id}
                                    type="button"
                                    className={`moza-wheel-card ${isSelected ? "selected" : ""}`}
                                    onClick={() => handleSelectWheel(wheel)}
                                >
                                    <img
                                        src={wheel.image}
                                        alt={wheel.name}
                                        className="moza-wheel-thumb"
                                        loading="lazy"
                                    />
                                    <div className="moza-wheel-meta">
                                        <span className="moza-wheel-name">{wheel.name}</span>
                                        <span className="moza-wheel-sub">{wheel.subtitle}</span>
                                    </div>
                                </button>
                            );
                        })}
                        {filteredWheels.length === 0 && (
                            <div className="moza-empty">No wheels match "{searchQuery}".</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PresetSelector;
