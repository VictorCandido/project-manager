export function getNameFeedback(name: string): string {
    return name
        .split(' ')
        .map(name => name.charAt(0).toUpperCase())
        .join('');
}

export function formatTime(timeString: string) {
    let timeStringOnlyNumbers = "";
    let timeFormatted = "";
    let splittedString = new Array();
    let hourFourDigits = "";

    if (typeof timeString !== "string") {
        return "";
    }

    timeStringOnlyNumbers = timeString.replace(/\D/g, "");

    switch (timeStringOnlyNumbers.length) {
        case 0:
            timeFormatted = "";
            break;

        case 1:
            timeFormatted = "0" + timeStringOnlyNumbers + ":00";
            break;

        case 2:
            if (parseInt(timeStringOnlyNumbers) > 24) {
                timeFormatted = "";
                break;
            }

            if (timeStringOnlyNumbers === "24") {
                timeFormatted = "00:00";
                break;
            }

            timeFormatted = timeStringOnlyNumbers + ":00";
            break;

        case 3:
            splittedString = timeStringOnlyNumbers.split("");

            if (parseInt(splittedString[1] + splittedString[2]) > 59) {
                splittedString[1] = "5";
                splittedString[2] = "9";
            }

            timeFormatted =
                "0" + splittedString[0] + ":" + splittedString[1] + splittedString[2];
            break;

        default:
            hourFourDigits = timeStringOnlyNumbers.substr(0, 4);
            splittedString = hourFourDigits.split("");

            if (parseInt(splittedString[0] + splittedString[1]) > 24) {
                timeFormatted = "";
                break;
            }

            if (splittedString[0] + splittedString[1] === "24") {
                splittedString[0] = "0";
                splittedString[1] = "0";
            }

            if (parseInt(splittedString[2] + splittedString[3]) > 59) {
                splittedString[2] = "5";
                splittedString[3] = "9";
            }

            timeFormatted =
                splittedString[0] +
                splittedString[1] +
                ":" +
                splittedString[2] +
                splittedString[3];
            break;
    }

    return timeFormatted;
}