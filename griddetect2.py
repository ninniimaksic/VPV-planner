import cv2
import numpy as np

image = cv2.imread("grideg.png")
hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
lower_color = np.array([86, 94, 180])
upper_color = np.array([241, 241, 255])
mask = cv2.bitwise_not(cv2.inRange(hsv, lower_color, upper_color))
mask = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR)
masked_image = cv2.bitwise_and(image, mask)

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
blurred = cv2.GaussianBlur(gray, (3, 3), 0)
edges = cv2.Canny(blurred, 50, 150)
lines = cv2.HoughLinesP(
    edges, 1, np.pi / 180, threshold=39, minLineLength=30, maxLineGap=20
)
filtered_lines = []
min_line_length = 50
max_line_length = 650
for line in lines:
    x1, y1, x2, y2 = line[0]
    line_length = np.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    if line_length >= min_line_length and line_length <= max_line_length:
        filtered_lines.append(line)
for line in filtered_lines:
    x1, y1, x2, y2 = line[0]
    cv2.line(image, (x1, y1), (x2, y2), (0, 0, 255), 2)
cv2.imshow("Grid Layout", image)
cv2.waitKey(0)
cv2.destroyAllWindows()
