﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class SectionUpdateDTO
    {

        public string Title { get; set; }
        public string Color { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }

    }
}