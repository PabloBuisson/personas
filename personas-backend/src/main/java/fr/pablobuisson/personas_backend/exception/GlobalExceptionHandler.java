package fr.pablobuisson.personas_backend.exception;

import org.springframework.context.annotation.PropertySource;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.*;
import java.util.stream.Collectors;

@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
@PropertySource("classpath:/validationMessages.properties")
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    /**
     * Display custom error message for !@Valid properties.
     * Before :
     * {
     *   "type": "about:blank",
     *   "title": "Bad Request",
     *   "status": 400,
     *   "detail": "Invalid request content.",
     *   "instance": "/api/personas"
     * }
     * After :
     * {
     *   "timestamp": "2024-03-27T07:32:05.397+00:00",
     *   "title": "Bad Request",
     *   "status": 400,
     *   "detail": "Invalid request content.",
     *   "errors": [
     *     "The age of the persona is required",
     *     "The name of the persona is required"
     *   ]
     * }
     */
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", new Date());
        body.put("title", ex.getBody().getTitle());
        body.put("status", status.value());
        body.put("detail", ex.getBody().getDetail());

        List<String> fieldErrors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(field -> field.getDefaultMessage() != null ? field.getDefaultMessage().replaceAll("\\$\\{field}", field.getField()) : field.getField())
                .collect(Collectors.toList());

        body.put("errors", fieldErrors);

        return new ResponseEntity<>(body, headers, status);
    }
}
