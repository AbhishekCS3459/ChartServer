
export default function CubeLoader() {
    return (
      <div className="cube-loader">
        <div className="cube">
          <div className="side front"></div>
          <div className="side back"></div>
          <div className="side right"></div>
          <div className="side left"></div>
          <div className="side top"></div>
          <div className="side bottom"></div>
        </div>
        <style jsx>{`
          .cube-loader {
            width: 60px;
            height: 60px;
            perspective: 120px;
          }
          .cube {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            animation: rotate 2s infinite linear;
          }
          .side {
            position: absolute;
            width: 100%;
            height: 100%;
            background: linear-gradient(145deg, #3b82f6, #8b5cf6);
            border: 2px solid #1f2937;
            opacity: 0.8;
          }
          .front  { transform: rotateY(0deg)   translateZ(30px); }
          .back   { transform: rotateY(180deg) translateZ(30px); }
          .right  { transform: rotateY(90deg)  translateZ(30px); }
          .left   { transform: rotateY(-90deg) translateZ(30px); }
          .top    { transform: rotateX(90deg)  translateZ(30px); }
          .bottom { transform: rotateX(-90deg) translateZ(30px); }
          @keyframes rotate {
            0% { transform: rotateX(0deg) rotateY(0deg); }
            100% { transform: rotateX(360deg) rotateY(360deg); }
          }
        `}</style>
      </div>
    )
  }