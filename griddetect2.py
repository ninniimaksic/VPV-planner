import cv2
import numpy as np

image = cv2.imread("grideg.png")
hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
lower_rgb = np.array([86, 94, 180])
upper_rgb = np.array([241, 241, 255])
mask = cv2.bitwise_not(cv2.inRange(hsv, lower_rgb, upper_rgb))  # Filtrer ut non-blått
mask = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR)  # Back to 3-channel
masked_img = cv2.bitwise_and(image, mask)

gray = cv2.cvtColor(masked_img, cv2.COLOR_BGR2GRAY)
blurred = cv2.GaussianBlur(gray, (3, 3), 0)
edges = cv2.Canny(blurred, 50, 150)
lines = cv2.HoughLinesP(
    edges, 1, np.pi / 180, threshold=39, minLineLength=30, maxLineGap=20
)
filt_lines = []
minlen = 50
maxlen = 630
for line in lines:  # Filtrer ut linjer utenfor min-max range
    x1, y1, x2, y2 = line[0]
    len = np.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    if len >= minlen and len <= maxlen:
        filt_lines.append(line)
for line in filt_lines:
    x1, y1, x2, y2 = line[0]
    cv2.line(image, (x1, y1), (x2, y2), (0, 0, 255), 2)
cv2.imshow("Grid Layout", image)
cv2.waitKey(0)
cv2.destroyAllWindows()
