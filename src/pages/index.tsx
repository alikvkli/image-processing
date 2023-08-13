import { useCallback, useEffect, useRef, useState } from "react"
import ImageProcessor from "../libs/image-processor"
import Webcam from "react-webcam";
import ThresholdAlgorithms from "../libs/threshold-algorithms";
const videoConstraints = {
    facingMode: { exact: "environment" }
};
export default function HomePage() {
    const imageProcessor = useRef<ImageProcessor>(new ImageProcessor());
    const thresholdAlgorithms = new ThresholdAlgorithms(); // Threshold algoritmaları sınıfını oluşturuyoruz
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [screenshot, setScreenShot] = useState<string>("");




    const processImage = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const image = new Image();
        image.onload = () => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            const thresholdLevel = thresholdAlgorithms.binarizationThresholdNormalized(imageData);
            console.log(thresholdLevel)
            const processedImage = imageProcessor.current.processImage(canvas, thresholdLevel);
            ctx.putImageData(processedImage, 0, 0);
        };
        image.src = screenshot;
    }

    const webcamRef = useRef<Webcam>(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setScreenShot(imageSrc)
        }
    }, [webcamRef]);

    useEffect(() => {
        if (screenshot) {
            processImage()
        }
    }, [screenshot])

    return (
        <div>
            <Webcam
                ref={webcamRef}
                audio={false}
                videoConstraints={videoConstraints}
                screenshotFormat="image/jpeg"
            />
            <button className="bg-indigo-900 text-white px-2 py-1.5 rounded-md mt-2 mb-2" onClick={capture}>Tarama</button>
            <div className="border-2 border-zinc-300">
                <canvas ref={canvasRef} width={400} height={300} />
            </div>
        </div>
    )
}