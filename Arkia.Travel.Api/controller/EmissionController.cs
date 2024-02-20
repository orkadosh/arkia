using System;
using Arkia.Travel.Api.model;
using Arkia.Travel.Api.service;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Arkia.Travel.Api.controller
{
    public class EmissionController : Controller
    {
        private readonly EmissionService _emissionService;


        public EmissionController(EmissionService emissionService)
        {
            _emissionService = emissionService;
        }


        [HttpPost("computeFlightEmissions")]
        public async Task<IActionResult> ComputeFlightEmissions([FromBody] FlightRequest flightRequest)
        {
            var result = await _emissionService.ComputeFlightEmissionsAsync(flightRequest);

            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                //  return StatusCode(500, "Error processing the request");
                return StatusCode(500, result);

            }
        }

    }
}

