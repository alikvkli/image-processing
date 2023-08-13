class ThresholdAlgorithms {

    private binarizationThreshold(pixels: Uint8ClampedArray): number {
        const histogram = new Array(256).fill(0);
        for (let i = 0; i < pixels.length; i += 4) {
            const grayValue = Math.floor(
                0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2]
            );
            histogram[grayValue]++;
        }

        let totalPixels = pixels.length / 4;
        let sum = 0;
        for (let i = 0; i < 256; i++) {
            sum += i * histogram[i];
        }

        let sumB = 0;
        let wB = 0;
        let wF = 0;
        let varMax = 0;
        let threshold = 0;

        for (let i = 0; i < 256; i++) {
            wB += histogram[i];
            if (wB === 0) continue;

            wF = totalPixels - wB;
            if (wF === 0) break;

            sumB += i * histogram[i];
            let mB = sumB / wB;
            let mF = (sum - sumB) / wF;

            let varBetween = wB * wF * (mB - mF) * (mB - mF);

            if (varBetween > varMax && i / 255 >= 0.450 && i / 255 <= 0.550) {
                varMax = varBetween;
                threshold = i;
            }
        }
        return threshold / 255;
    }

    binarizationThresholdNormalized(pixels: Uint8ClampedArray): number {
        return this.binarizationThreshold(pixels);
    }
}

export default ThresholdAlgorithms;
