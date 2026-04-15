import { useState, useEffect } from 'react';

const phases = [
  { step: '1', label: 'Market opens', detail: 'First snapshot recorded', color: '#A1A1AA' },
  { step: '2', label: 'Book forms', detail: 'Bids and asks stack up', color: '#A1A1AA' },
  { step: '3', label: 'Spread tightens', detail: 'Liquidity flows in', color: '#EAB308' },
  { step: '4', label: 'Volume spikes', detail: 'One side starts loading', color: '#22C55E' },
  { step: '5', label: 'Price follows', detail: 'The book called it first', color: '#10B981' },
  { step: '6', label: 'Resolution', detail: 'Winner, volume, settlement', color: '#10B981' },
];

export function MarketLifecycle() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const runSequence = () => {
      setComplete(false);
      setActiveIndex(-1);

      phases.forEach((_, i) => {
        timeout = setTimeout(() => {
          setActiveIndex(i);
          if (i === phases.length - 1) {
            // Hold the complete state, then restart
            setTimeout(() => {
              setComplete(true);
              setTimeout(runSequence, 2000);
            }, 1500);
          }
        }, i * 700);
      });
    };

    runSequence();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="py-16 bg-surface-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What the data shows you</h2>
          <p className="text-text-muted text-lg">
            Every step of a market's life, captured at 300ms resolution.
          </p>
        </div>

        {/* Desktop: horizontal pipeline */}
        <div className="hidden lg:block">
          <div className="max-w-5xl mx-auto">
            {/* Cards */}
            <div className="grid grid-cols-6 gap-4">
              {phases.map((phase, i) => {
                const isActive = i <= activeIndex;
                const isCurrent = i === activeIndex && !complete;
                const isComplete = complete;

                return (
                  <div
                    key={phase.step}
                    className="transition-all duration-500"
                    style={{
                      transform: isCurrent ? 'translateY(-4px)' : 'translateY(0)',
                    }}
                  >
                    <div
                      className="p-4 rounded-xl border text-center h-full flex flex-col justify-center transition-all duration-500"
                      style={{
                        borderColor: isActive ? `${phase.color}40` : 'rgba(255,255,255,0.08)',
                        background: isActive
                          ? `linear-gradient(180deg, ${phase.color}08 0%, transparent 100%)`
                          : 'rgba(255,255,255,0.02)',
                        boxShadow: isCurrent
                          ? `0 0 20px ${phase.color}15, 0 4px 12px rgba(0,0,0,0.3)`
                          : isComplete
                          ? `0 0 12px ${phase.color}10`
                          : 'none',
                      }}
                    >
                      <div
                        className="text-2xl font-bold mb-2 transition-all duration-500"
                        style={{
                          color: isActive ? phase.color : '#52525B',
                          textShadow: isCurrent ? `0 0 8px ${phase.color}60` : 'none',
                        }}
                      >
                        {phase.step}
                      </div>
                      <div
                        className="text-sm font-semibold mb-1 transition-colors duration-500"
                        style={{ color: isActive ? '#FAFAFA' : '#71717A' }}
                      >
                        {phase.label}
                      </div>
                      <div
                        className="text-xs transition-colors duration-500"
                        style={{ color: isActive ? '#A1A1AA' : '#52525B' }}
                      >
                        {phase.detail}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Connecting progress line below cards */}
            <div className="relative mt-6 mx-[8%]">
              <div className="w-full h-[2px] bg-border rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: activeIndex >= 0 ? `${((activeIndex + 1) / phases.length) * 100}%` : '0%',
                    background: 'linear-gradient(90deg, #A1A1AA, #10B981)',
                  }}
                />
              </div>
              {/* Traveling pulse dot */}
              {activeIndex >= 0 && !complete && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full transition-all duration-700 ease-out"
                  style={{
                    left: `${((activeIndex + 0.5) / phases.length) * 100}%`,
                    background: phases[activeIndex].color,
                    boxShadow: `0 0 10px ${phases[activeIndex].color}, 0 0 20px ${phases[activeIndex].color}40`,
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile/tablet: 2x3 grid with sequential glow */}
        <div className="lg:hidden">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {phases.map((phase, i) => {
              const isActive = i <= activeIndex;

              return (
                <div
                  key={phase.step}
                  className="p-4 rounded-xl border text-center flex flex-col justify-center transition-all duration-500"
                  style={{
                    borderColor: isActive ? `${phase.color}40` : 'rgba(255,255,255,0.08)',
                    background: isActive
                      ? `linear-gradient(180deg, ${phase.color}08 0%, transparent 100%)`
                      : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <div
                    className="text-2xl font-bold mb-2 transition-all duration-500"
                    style={{ color: isActive ? phase.color : '#52525B' }}
                  >
                    {phase.step}
                  </div>
                  <div
                    className="text-sm font-semibold mb-1 transition-colors duration-500"
                    style={{ color: isActive ? '#FAFAFA' : '#71717A' }}
                  >
                    {phase.label}
                  </div>
                  <div
                    className="text-xs transition-colors duration-500"
                    style={{ color: isActive ? '#A1A1AA' : '#52525B' }}
                  >
                    {phase.detail}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p
          className="text-center text-sm mt-8 transition-all duration-700"
          style={{
            color: complete ? '#A1A1AA' : '#52525B',
            opacity: complete ? 1 : 0.6,
          }}
        >
          Every level of depth. From open to settlement. This is what candle data hides from you.
        </p>
      </div>
    </section>
  );
}
