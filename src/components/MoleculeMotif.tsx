/**
 * Chemical Molecule Motif Component
 * Adds decorative molecule-inspired background patterns and animations
 * to sections for visual interest and brand identity reinforcement
 */

interface MoleculeMotifProps {
  variant?: 'circles' | 'orbits' | 'atoms';
  intensity?: 'subtle' | 'medium' | 'prominent';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  animated?: boolean;
}

export function MoleculeMotif({
  variant = 'circles',
  intensity = 'subtle',
  position = 'top-right',
  animated = true,
}: MoleculeMotifProps) {
  const intensityMap = {
    subtle: 'opacity-5',
    medium: 'opacity-10',
    prominent: 'opacity-20',
  };

  const positionMap = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  };

  return (
    <div
      className={`absolute ${positionMap[position]} pointer-events-none overflow-hidden ${
        animated ? 'animate-float' : ''
      }`}
      aria-hidden="true"
    >
      {variant === 'circles' && (
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
          className={`${intensityMap[intensity]}`}
        >
          {/* Outer circle (blue) */}
          <circle
            cx="150"
            cy="150"
            r="100"
            fill="none"
            stroke="#0066cc"
            strokeWidth="2"
            opacity="0.6"
          />

          {/* Middle circle (orange) */}
          <circle
            cx="150"
            cy="150"
            r="70"
            fill="none"
            stroke="#f26522"
            strokeWidth="2"
            opacity="0.6"
          />

          {/* Inner circle (green) */}
          <circle
            cx="150"
            cy="150"
            r="40"
            fill="none"
            stroke="#00a651"
            strokeWidth="2"
            opacity="0.6"
          />

          {/* Center atom */}
          <circle cx="150" cy="150" r="6" fill="#0066cc" opacity="0.8" />
        </svg>
      )}

      {variant === 'orbits' && (
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
          className={`${intensityMap[intensity]}`}
        >
          {/* Orbital paths */}
          <defs>
            <style>{`
              @keyframes orbit1 {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes orbit2 {
                from { transform: rotate(0deg); }
                to { transform: rotate(-360deg); }
              }
            `}</style>
          </defs>

          <g
            style={{
              animation: 'orbit1 20s linear infinite',
              transformOrigin: '150px 150px',
            }}
          >
            <circle
              cx="150"
              cy="80"
              r="6"
              fill="#f26522"
            />
            <path
              d="M 150 150 A 70 70 0 0 1 220 150"
              fill="none"
              stroke="#f26522"
              strokeWidth="1"
              opacity="0.4"
            />
          </g>

          <g
            style={{
              animation: 'orbit2 30s linear infinite',
              transformOrigin: '150px 150px',
            }}
          >
            <circle
              cx="220"
              cy="150"
              r="5"
              fill="#0066cc"
            />
            <path
              d="M 150 150 A 100 100 0 0 1 150 50"
              fill="none"
              stroke="#0066cc"
              strokeWidth="1"
              opacity="0.4"
            />
          </g>

          {/* Center core */}
          <circle cx="150" cy="150" r="8" fill="#00a651" opacity="0.8" />
        </svg>
      )}

      {variant === 'atoms' && (
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
          className={`${intensityMap[intensity]}`}
        >
          {/* Atom 1 (orange) */}
          <g>
            <circle cx="100" cy="100" r="30" fill="none" stroke="#f26522" strokeWidth="1.5" opacity="0.5" />
            <circle cx="100" cy="100" r="8" fill="#f26522" opacity="0.8" />
          </g>

          {/* Atom 2 (blue) */}
          <g>
            <circle cx="200" cy="150" r="35" fill="none" stroke="#0066cc" strokeWidth="1.5" opacity="0.5" />
            <circle cx="200" cy="150" r="10" fill="#0066cc" opacity="0.8" />
          </g>

          {/* Atom 3 (green) */}
          <g>
            <circle cx="150" cy="220" r="28" fill="none" stroke="#00a651" strokeWidth="1.5" opacity="0.5" />
            <circle cx="150" cy="220" r="7" fill="#00a651" opacity="0.8" />
          </g>

          {/* Connection bonds */}
          <line
            x1="100"
            y1="100"
            x2="200"
            y2="150"
            stroke="#1a1a1a"
            strokeWidth="1"
            opacity="0.3"
          />
          <line
            x1="200"
            y1="150"
            x2="150"
            y2="220"
            stroke="#1a1a1a"
            strokeWidth="1"
            opacity="0.3"
          />
        </svg>
      )}
    </div>
  );
}

export default MoleculeMotif;