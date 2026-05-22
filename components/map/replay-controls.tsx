"use client"

interface ReplayControlsProps {

  isPlaying: boolean

  setIsPlaying:
    React.Dispatch<
      React.SetStateAction<boolean>
    >

  replaySpeed: number

  setReplaySpeed:
    React.Dispatch<
      React.SetStateAction<number>
    >

  onReplay: () => void
}

export function ReplayControls({

  isPlaying,

  setIsPlaying,

  replaySpeed,

  setReplaySpeed,

  onReplay

}: ReplayControlsProps) {

  return (

    <div className="
      absolute
      bottom-5
      left-1/2
      -translate-x-1/2
      z-50

      flex
      items-center
      gap-3

      px-4
      py-3

      rounded-2xl

      bg-black/55
      backdrop-blur-2xl

      border
      border-white/10

      shadow-2xl
    ">

      {/* PLAY / PAUSE */}

      <button

        onClick={() =>
          setIsPlaying(
            !isPlaying
          )
        }

        className="
          w-11
          h-11

          rounded-xl

          bg-emerald-500
          hover:bg-emerald-600

          text-white
          text-lg

          transition-all
          duration-300
        "
      >

        {isPlaying ? "⏸" : "▶"}

      </button>

      {/* REPLAY */}

      <button

        onClick={onReplay}

        className="
          px-4
          py-2

          rounded-xl

          bg-white/10
          hover:bg-white/20

          text-white
          text-sm
          font-medium

          transition-all
        "
      >

        ↺ Replay

      </button>

      {/* SPEED */}

      <div className="
        flex
        items-center
        gap-2
      ">

        {[1, 2, 4].map((speed) => (

          <button

            key={speed}

            onClick={() =>
              setReplaySpeed(speed)
            }

            className={`
              px-3
              py-2

              rounded-xl

              text-sm
              font-medium

              transition-all

              ${
                replaySpeed === speed

                ? `
                  bg-emerald-500
                  text-white
                `

                : `
                  bg-white/10
                  text-white/70
                  hover:bg-white/20
                `
              }
            `}
          >

            {speed}x

          </button>

        ))}

      </div>

    </div>

  )

}