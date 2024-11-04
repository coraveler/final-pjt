package com.kdt_final.back.Shop.ctrl;

import com.kdt_final.back.Shop.domain.CouponRequest;
import com.kdt_final.back.Shop.domain.Mileage;
import com.kdt_final.back.Shop.domain.MileageHistory;
import com.kdt_final.back.Shop.service.MileageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mileage")
public class MileageController {
    private final MileageService mileageService;

    @Autowired
    public MileageController(MileageService mileageService) {
        this.mileageService = mileageService;
    }

    @GetMapping("/{userId}")
    public Mileage getMileage(@PathVariable int userId) {
        return mileageService.getMileageByUserId(userId);
    }

    @PostMapping("/")
    public void addMileage(@RequestBody Mileage mileage) {
        mileageService.addMileage(mileage);
    }

    @PostMapping("/history")
    public void addMileageHistory(@RequestBody MileageHistory mileageHistory) {
        mileageService.addMileageHistory(mileageHistory);
    }

    @GetMapping("/history/{userId}")
    public List<MileageHistory> getMileageHistory(@PathVariable int userId) {
        return mileageService.getMileageHistory(userId);
    }

    @PostMapping("/register-coupon")
    public ResponseEntity<String> registerCoupon(@RequestBody CouponRequest couponRequest) {
        String couponCode = couponRequest.getCouponCode();
        int userId = couponRequest.getUserId();

        if ("testcp".equals(couponCode)) {
            Mileage mileage = new Mileage();
            mileage.setUserId(userId);
            mileage.setMileage(1000); // 쿠폰으로 추가할 포인트
            mileage.setChangeHistory("쿠폰 등록: " + couponCode);

            mileageService.addMileage(mileage);
            return ResponseEntity.ok("쿠폰 등록이 완료되었습니다.");
        }

        return ResponseEntity.badRequest().body("유효하지 않은 쿠폰 코드입니다.");
    }


}