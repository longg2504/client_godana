export default function checkOpenClose(startTime, endTime) {
    // Lấy giờ hiện tại
    var now = new Date();
    var currentHour = now.getHours();
    var currentMinute = now.getMinutes();

    // Chuyển đổi thời gian bắt đầu và kết thúc thành giờ và phút tương ứng
    var startSplit = startTime.split(":");
    var endSplit = endTime.split(":");
    var startHour = parseInt(startSplit[0], 10);
    var startMinute = parseInt(startSplit[1], 10);
    var endHour = parseInt(endSplit[0], 10);
    var endMinute = parseInt(endSplit[1], 10);


    var starSplit = startTime.split(":");
    var hourStart = starSplit[0];
    var minuteStart = starSplit[1];

    var endSplit = endTime.split(":");
    var hourEnd = endSplit[0];
    var minuteEnd = endSplit[1];




    // Tính toán giờ và phút hiện tại thành phút
    var currentTimeInMinutes = currentHour * 60 + currentMinute;
    var startTimeInMinutes = startHour * 60 + startMinute;
    var endTimeInMinutes = endHour * 60 + endMinute;
    ;
    if(startTime == "00:00:00" && endTime == "23:59:00"){
        return `Mở cả ngày`
    }
    if(startTime == "00:00" && endTime == "23:59"){
        return `Mở cả ngày`
    }
    // Kiểm tra xem thời gian hiện tại có nằm trong khoảng cho phép hay không
    if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes) {
        return `Mở cửa - Đóng cửa lúc: ${hourEnd + ':' + minuteEnd}`;
    } else {
        return `Đóng cửa - Mở cửa lúc: ${hourStart + ':' + minuteStart}`;
    }
}