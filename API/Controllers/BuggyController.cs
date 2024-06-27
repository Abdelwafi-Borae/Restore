namespace Name.Controllers
{

    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController : ControllerBase
    {
        
        [HttpGet("BadRequest")]
        public async Task<IActionResult> BadRequest()
        {
            
            return BadRequest(new ProblemDetails { Title = "this is bad request" });
        }
        [HttpGet("getunauthenticated")]
        public async Task<IActionResult> GetunAuthenticated()
        {
            
            return Unauthorized();
        }
        [HttpGet("getnotfound")]
        public async Task<IActionResult> Getnotfound()
        {

            return NotFound();
        }
        [HttpGet("Getvalidationerror")]
        public async Task<IActionResult> Getvalidationerror()
        {
            ModelState.AddModelError("error1","the first error ");
            ModelState.AddModelError("error2","the second error ");
            return ValidationProblem();
        }
        [HttpGet("getservererror")]
        public  Task<IActionResult> getservererror()
        {

            throw new Exception("this is a server error");   
        }
    }
}