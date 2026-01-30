package com.LeanAranda.notesApp.configuration;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private final Algorithm algorithm;
    private static final long TOKEN_EXPIRATION_DAYS = 30;
    private static final long MILLIS_IN_DAY = 1000L * 60 * 60 * 24; //1s * 1m * 1h * 1d

    public JwtUtil(@Value("${JWT_KEY}") String privateKey) {
        this.algorithm = Algorithm.HMAC256(privateKey);
    }

    public String generateToken(String username){
        return JWT.create()
                .withSubject(username)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + TOKEN_EXPIRATION_DAYS * MILLIS_IN_DAY))
                .sign(algorithm);
    }

    public String validateToken(String token){
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decoded = verifier.verify(token);
        return decoded.getSubject();
    }
}
