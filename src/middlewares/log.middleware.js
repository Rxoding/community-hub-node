import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // error, warn. debug 등 여러가지 로그를 출력할수 있음.
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

// 진행순서 1
export default function (req, res, next) {
  const start = new Date().getTime();
  //3 콜백함수 실행
  res.on('finish', () => {
    const duration = new Date().getTime() - start;
    logger.info(
      `Method: ${req.method}, URL: ${req.url}, Status: ${res.statusCode}, Duration: ${duration}ms`
    );
    //2
    next();
  });
}
