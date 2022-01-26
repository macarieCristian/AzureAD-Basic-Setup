package aad.resource.server.aadlightconfig.web.controller;

import aad.resource.server.aadlightconfig.web.dto.DummyDto;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;


@Log4j2
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/dummy")
@RestController
public class DummyController {

    @GetMapping("/authorized")
    public ResponseEntity<DummyDto> getAuthorized(Authentication authentication) {
        Assert.notNull(authentication, "Authentication is null");
        return ResponseEntity.ok(DummyDto.builder().id(UUID.randomUUID()).message("Authorized resource").build());
    }

    @GetMapping("/public")
    public ResponseEntity<DummyDto> getPublic() {
        return ResponseEntity.ok(DummyDto.builder().id(UUID.randomUUID()).message("Public resource").build());
    }
}
