using System;
namespace Arkia.Travel.Api.model
{
	public class Flight
	{
        public string Origin { get; set; }
        public string Destination { get; set; }
        public string OperatingCarrierCode { get; set; }
        public int FlightNumber { get; set; }
        public DepartureDate DepartureDate { get; set; }
    }
}

