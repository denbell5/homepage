var c2div = document.getElementById("c2div");

let processor = {
    timerCallback: function () {
        if (this.video.paused || this.video.ended) {
            c2div.style.display = 'none';
            return;
        }

        this.computeFrame();

        let self = this;
        setTimeout(function () {
            self.timerCallback();
        }, 0);
    },

    doLoad: function () {
        this.video = document.getElementById("video");
        this.btnPlay = document.getElementById("btnPlay");

        this.c1 = document.getElementById("c1");
        this.ctx1 = this.c1.getContext("2d");

        this.c2 = document.getElementById("c2");
        this.ctx2 = this.c2.getContext("2d");
        let self = this;

        this.btnPlay.addEventListener("click", function () {
            c2div.style.display = 'block';
            let koPositionY = window.pageYOffset - document.documentElement.clientHeight / 2;
            
            c2div.style.top = koPositionY + "px";
            c2div.style.left = 25 + "%";

            
            self.width = document.documentElement.clientWidth / 2;
            self.height = self.width * 9 / 16;
            self.video.play();
            self.timerCallback();
        }, false);
    },

    computeFrame: function () {
        this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
        let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
        let l = frame.data.length / 4;

        for (let i = 0; i < l; i++) {
            let r = frame.data[i * 4 + 0];
            let g = frame.data[i * 4 + 1];
            let b = frame.data[i * 4 + 2];
            if (g > 100)
                frame.data[i * 4 + 3] = 0;
        }
        this.ctx2.putImageData(frame, 0, 0);
        return;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    processor.doLoad();
});