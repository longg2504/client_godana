export default function splitTime(time) {
    // Chia chuỗi thời gian thành giờ và phút
    var split = time.split(":");
    var hour = split[0];
    var minute = split[1];
    
    // Trả về một đối tượng với giờ và phút
    return {
        timeString: `${hour}:${minute} `
    };
}