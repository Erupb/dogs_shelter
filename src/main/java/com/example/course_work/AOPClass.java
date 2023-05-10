package com.example.course_work;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@Aspect
public class AOPClass {

    @Pointcut("within(com.example.course_work.service.*)")
    public void executionServiceMethod() {}

    @Around("executionServiceMethod()")
    public Object timeExecutionServiceMethod(ProceedingJoinPoint jp) throws Throwable {
        long begin = System.currentTimeMillis();
        Object object = jp.proceed();
        long end = System.currentTimeMillis();
        log.info(jp.getSignature().toShortString() + " completed in " + (end - begin) + " ms" );
        return object;
    }

}
