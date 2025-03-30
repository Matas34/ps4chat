namespace SpeedReaderAPI.Services;

using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.DTOs.Paragraph.Responses;

public interface IParagraphService : IServiceWithImage<ParagraphResponse>
{
    ParagraphResponse CreateParagraph(ParagraphCreateRequest request);
    public ParagraphResponse GetParagraph(int id);
    public PageResponse<ParagraphResponse> SearchParagraphs(QueryParameters queryParameters);
    ParagraphResponse UpdateParagraph(int id, ParagraphUpdateRequest request);
    void DeleteParagraph(int paragraphId);
    long GetCount();

}
