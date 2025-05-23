﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SpeedReaderAPI.Data;

#nullable disable

namespace SpeedReaderAPI.Data.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20241016180347_Remove nextId from paragraphs")]
    partial class RemovenextIdfromparagraphs
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("SpeedReaderAPI.Entities.Article", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CategoryTitle")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageFileName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageFilePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ImageMimeType")
                        .HasColumnType("int");

                    b.Property<string>("ParagraphIds")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.ToTable("Article");
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.Paragraph", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ArticleId")
                        .HasColumnType("int");

                    b.Property<string>("ImageFileName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageFilePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ImageMimeType")
                        .HasColumnType("int");

                    b.Property<string>("QuestionIds")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(1500)
                        .HasColumnType("nvarchar(1500)");

                    b.Property<string>("Title")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("ArticleId");

                    b.ToTable("Paragraph");
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AnswerChoices")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CorrectAnswerIndex")
                        .HasMaxLength(255)
                        .HasColumnType("int");

                    b.Property<string>("ImageFileName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageFilePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ImageMimeType")
                        .HasColumnType("int");

                    b.Property<int>("ParagraphId")
                        .HasColumnType("int");

                    b.Property<string>("QuestionText")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Title")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("ParagraphId");

                    b.ToTable("Question");
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.Paragraph", b =>
                {
                    b.HasOne("SpeedReaderAPI.Entities.Article", "Article")
                        .WithMany("Paragraphs")
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Article");
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.Question", b =>
                {
                    b.HasOne("SpeedReaderAPI.Entities.Paragraph", "Paragraph")
                        .WithMany("Questions")
                        .HasForeignKey("ParagraphId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Paragraph");
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.Article", b =>
                {
                    b.Navigation("Paragraphs");
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.Paragraph", b =>
                {
                    b.Navigation("Questions");
                });
#pragma warning restore 612, 618
        }
    }
}
