package com.kdt_final.back.user.ctrl;

import com.kdt_final.back.user.dto.UserDTO;
import com.kdt_final.back.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO.UserResponseDTO>> findUserAll() {

        List<UserDTO.UserResponseDTO> responseDTOS = userService.findUserAll();

        ResponseEntity<List<UserDTO.UserResponseDTO>> responseEntity = ResponseEntity.ok()
                .body(responseDTOS);

        return responseEntity;
    }

    @GetMapping("/check/userNickname/{userNickname}")
    public Boolean checkDuplicateUserNickName(@PathVariable String userNickname) {
        System.out.println(userNickname);

        Boolean result= userService.checkDuplicateUserNickName(userNickname);
        return result;
    }


    @GetMapping("/check/loginId/{loginId}")
    public Boolean checkDuplicateLoginId(@PathVariable String loginId){
        System.out.println(loginId);

        Boolean result1=userService.checkDuplicateLoginId(loginId);
        return result1;
    }


    @PostMapping
    public ResponseEntity<Boolean> createUser(@RequestBody UserDTO.UserRequestDTO userDTO) {
        System.out.println("객체확인"+userDTO);

        userService.creatUser(userDTO);

        ResponseEntity<Boolean> responseEntity = ResponseEntity.ok()
                .body(true);
        return  responseEntity;


    }

    @PatchMapping
    public void updateUser(){

    }

}