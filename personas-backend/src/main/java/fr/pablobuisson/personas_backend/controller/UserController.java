package fr.pablobuisson.personas_backend.controller;

import fr.pablobuisson.personas_backend.dto.SummaryDto;
import fr.pablobuisson.personas_backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(UserController.API_URL)
@Data
@AllArgsConstructor
public class UserController {
    public final static String API_URL = "/api/user";

    private final UserService userService;

    @GetMapping(path = "/summary", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get summary of projects and personas", operationId = "getSummary")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<SummaryDto> getSummaryOfProjectsAndPersonas() {
        return new ResponseEntity<>(userService.getSummary(), HttpStatus.OK);
    }
}
