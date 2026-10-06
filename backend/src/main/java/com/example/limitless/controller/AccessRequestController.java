package com.example.limitless.controller;

import com.example.limitless.dto.AccessRequestRequest;
import com.example.limitless.entity.User;
import com.example.limitless.service.AccessRequestService;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/access-requests")
public class AccessRequestController {

    private final AccessRequestService service;

    public AccessRequestController(AccessRequestService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@RequestBody AccessRequestRequest req) {
        User u = service.createRequest(req);
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("id", u.getId());
        body.put("status", u.getStatus().name());
        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }

    // Optional ?role=MANAGER; defaults to ACCOUNTANT
    @PutMapping("/{id}/approve")
    public Map<String, Object> approve(@PathVariable Integer id,
                                       @RequestParam(required = false) String role) {
        User u = service.approve(id, role);
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("id", u.getId());
        body.put("username", u.getUsername());
        body.put("status", u.getStatus().name());
        return body;
    }

    @PutMapping("/{id}/reject")
    public Map<String, Object> reject(@PathVariable Integer id) {
        User u = service.reject(id);
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("id", u.getId());
        body.put("status", u.getStatus().name());
        return body;
    }
}