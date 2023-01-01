using Entities.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Validation
{
    public class TodoDTOValidation:AbstractValidator<SectionDTO>
    {
        public TodoDTOValidation()
        {
            RuleFor(x => x.Title).NotNull().WithMessage("{PropertyName} is requireed").NotEmpty().WithMessage("{PopertyName} is required");
        }
    }
}
