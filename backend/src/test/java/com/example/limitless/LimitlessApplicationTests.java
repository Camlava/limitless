package com.example.limitless;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest
class LimitlessApplicationTests {

	@Test
	void contextLoads() {
	}


	@Test
	void printTestHash() {
		System.out.println(new BCryptPasswordEncoder().encode("TestPass1!"));
	}
}
